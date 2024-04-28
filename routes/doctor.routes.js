var express = require('express');
var router = express.Router();
var doctorModel = require("../models/Doctor")
var appointmentModel = require("../models/Appointment")
var tipstModel = require("../models/Tips")
var sendMail = require("../utils/sendMail")
var isAdmin = require("../middlewares/isAdmin")

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
        //TODO:fetch next day appointments
        res.render('sessionInfo', { doctors })
    } catch (error) {
        res.redirect('/admin')
    }
})

router.get('/profile', isAdmin, async (req, res) => {
    const doctors = await doctorModel.findOne({ username: req.session.username }).select("-username");
    console.log(doctors);
    res.render('DoctorProfile', { doctors })
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

    // 2024-04-28
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
            { $match: { "user.date": currentDate, doctorId: doc[0]._id } },
            { $lookup: { from: "users", localField: "userId", foreignField: "_id", as: "email", pipeline: [{ $project: { email: 1 } }] } },
            { $project: { _id: 1, email: email[0].email } }
        ])

        console.log(idsToUpdate);
        date.setDate(date.getDate() + 1);
        const year2 = date.getFullYear();
        const month2 = String(date.getMonth() + 1).padStart(2, '0');
        const day2 = String(date.getDate()).padStart(2, '0');

        const newDate = `${year2}-${month2}-${day2}`
        const filter = { _id: { $in: idsToUpdate } };
        const update = { $set: { 'user.date': newDate } };
        const options = { multi: true };

        const result = await appointmentModel.updateMany(filter, update, options);
        await sendMail({ username: doc[0].name, email: newDate, password: "", type: "RESEDULED" })
        console.log(`${result.nModified} document(s) updated`);
    } catch (error) {
        res.status(500).send("Error updating user data");
    }
})
module.exports = router;
