var express = require('express');
var router = express.Router();
var doctorModel = require("../models/Doctor")
var appointmentModel = require("../models/Appointment")
var tipstModel = require("../models/Tips")
var sendMail = require("../utils/sendMail")
var isAdmin = require("../middlewares/isAdmin")
const uploads = require('../middlewares/Multer');

router.get('/allpatients', isAdmin, async (req, res) => {
    try {
        const doctors = await doctorModel.findOne({ username: req.session.username }).select("-experience -speciality -contactNo -timing -days -clinicLocation -limit -qualification -charges -username");
        const allPatients = await appointmentModel.aggregate([
            {
                $match: {
                    doctorId: doctors._id,
                },
            },
            {
                $group: {
                    _id: "$user.date",
                    appointment: {
                        $push: "$$ROOT",
                    },
                },
            },
            {
                $unwind: "$appointment",
            },
            {
                $lookup: {
                    from: "users",
                    localField: "appointment.userId",
                    foreignField: "_id",
                    as: "name",
                },
            },
            {
                $addFields: {
                    "appointment.name": {
                        $arrayElemAt: ["$name", 0],
                    },
                },
            },
            {
                $addFields: {
                    "appointment.fullname": "$appointment.name.fullname",
                    "appointment.email": "$appointment.name.email",
                    "appointment.time": "$appointment.user.time",
                    "appointment.issue": "$appointment.user.issue"
                }
            },
            {
                $project: {
                    "appointment.fullname": 1,
                    "appointment.time": 1,
                    "appointment.email": 1,
                    "appointment.issue": 1,
                    "appointment.status": 1
                }
            },
            {
                $group: {
                    _id: "$_id",
                    appointment: {
                        $push: "$appointment",
                    },
                },
            },
        ]
        )
        console.log("all");
        console.log(allPatients);
        if (!doctors) {
            throw new Error("Couldn't find any")
        }
        res.render('allPatient', { doctors, allPatients })
    } catch (error) {
        console.log(error.message);
        res.redirect('/admin')
    }
})
router.get('/sessioninfo', isAdmin, async (req, res) => {
    try {
        const doctors = await doctorModel.findOne({ username: req.session.username }).select("-experience -speciality -contactNo -timing -days -clinicLocation -limit -qualification -charges -username");
        console.log(doctors);
        if (!doctors) {
            throw new Error("Couldn't find any")
        }
        var today = new Date();
        var nextDay = new Date(today);
        nextDay.setDate(today.getDate() + 1);

        var year = nextDay.getFullYear();
        var month = String(nextDay.getMonth() + 1).padStart(2, '0');
        var day = String(nextDay.getDate()).padStart(2, '0');

        const newDate = `${year}-${month}-${day}`
        console.log(newDate);
        const nextApp = await appointmentModel.aggregate([
            { $match: { doctorId: doctors._id, "user.date": newDate } },
            { $lookup: { from: "users", foreignField: "_id", localField: "userId", as: "userId", pipeline: [{ $project: { email: 1 } }] } },
            {
                $addFields: {
                    "fullname": "$user.fullname",
                    "age": "$user.age",
                    "time": "$user.time",
                    "email": { $arrayElemAt: ["$userId.email", 0] }
                }
            },
            {
                $project: {
                    "fullname": 1,
                    "age": 1,
                    "time": 1,
                    "email": 1
                }
            }
        ]);

        console.log(nextApp);
        res.render('sessionInfo', { doctors, nextApp })
    } catch (error) {
        console.log(error);
        res.redirect('/admin')
    }
})
router.get('/profile', isAdmin, (req, res) => {
    res.render('DoctorProfile')
})
router.get('/profileDetails', isAdmin, async (req, res) => {
    try {
        const doctors = await doctorModel.findOne({ username: req.session.username }).select("-username");
        console.log(doctors);
        res.status(200).json({ doctors });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post("/updateProfile", isAdmin, uploads.single("image"), async (req, res) => {
    try {

        const { charges, clinicLocation, days, experience, from, speciality, to } = req.body
        if ([clinicLocation, experience, from, speciality, to].some(item => !item || item.trim() === "")) {
            const error = new Error("Some fields are required.")
            error.status = 401
            throw error
        }
        if (!charges || days.length === 0) {
            const error = new Error("Some fields are required.")
            error.status = 401
            throw error
        }
        console.log(req.body);
        const update = {
            $set: {
                charges, clinicLocation, days, experience, speciality, timing: `${from} - ${to}`
            }
        }
        const doctors = await doctorModel.findOneAndUpdate({ username: req.session.username }, update)
        res.status(200).json({ message: "Profile updated successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})
router.post("/addTips", async (req, res) => {
    try {
        const { tips } = req.body
        const doc = await doctorModel.aggregate([
            { $match: { username: req.session.username } },
            { $project: { _id: 1 } }
        ])
        console.log(doc);
        await tipstModel.create({
            tips,
            uploder: doc[0]._id,
        })
        res.sendStatus(200)
    } catch (error) {
        res.status(500).send("Couldn't save, server error");
    }
})
router.get("/emergency", isAdmin, async function (req, res) {

    try {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        const currentDate = `${year}-${month}-${day}`
        const doc = await doctorModel.aggregate([
            { $match: { username: req.session.username } },
            { $project: { _id: 1, name: 1 } }
        ])
        const idsToUpdate = await appointmentModel.aggregate([
            { $match: { "user.date": currentDate, doctorId: doc[0]._id, status: "PENDING" } },
            { $lookup: { from: "users", localField: "userId", foreignField: "_id", as: "user" } },
            { $unwind: "$user" },
            { $project: { _id: 1, email: "$user.email" } },
            { $group: { _id: null, _idArray: { $push: "$_id" }, emailArray: { $push: "$email" } } },
            { $project: { _id: 0, _idArray: 1, emailArray: 1 } }
        ])

        console.log(idsToUpdate);
        if (idsToUpdate.length === 0) {
            res.sendStatus(200)
            return;
        }
        const date = new Date(currentDate)
        date.setDate(date.getDate() + 1);
        const year2 = date.getFullYear();
        const month2 = String(date.getMonth() + 1).padStart(2, '0');
        const day2 = String(date.getDate()).padStart(2, '0');
        const newDate = `${year2}-${month2}-${day2}`
        const filter = { _id: { $in: idsToUpdate[0]._idArray } };
        const update = { $set: { 'user.date': newDate } };
        const options = { multi: true };
        const result = await appointmentModel.updateMany(filter, update, options);
        await sendMail({ username: doc[0].name, email: idsToUpdate[0].emailArray, password: newDate, type: "RESEDULED" })
        console.log(`${result.nModified} document(s) updated`);
        res.sendStatus(200)
    } catch (error) {
        console.log(error);
        res.status(500).send("Error updating user data");
    }
})

router.get('/appCancel/:id', isAdmin, async (req, res) => {
    try {
        const update = { $set: { status: "CANCEL" } }
        await appointmentModel.findByIdAndUpdate(req.params.id, update)
        res.sendStatus(200)
    } catch (error) {
        res.status(500).send("Couldn't modify status of appointment");

    }
})
router.get('/appDone/:id', isAdmin, async (req, res) => {
    try {
        const update = { $set: { status: "SUCCESS" } }
        await appointmentModel.findByIdAndUpdate(req.params.id, update)
        res.sendStatus(200)
    } catch (error) {
        res.status(500).send("Couldn't modify status of appointment");
    }
})
module.exports = router;