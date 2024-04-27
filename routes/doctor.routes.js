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
        const allPatients = await appointmentModel.find({ doctorId: doctors._id })
        console.log(allPatients);
        if (!doctors) {
            throw new Error("Couldn't find any")
        }
        res.render('allPatient', { doctors, allPatients })
    } catch (error) {
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
        await tipstModel.create({
            tips,
            uploder: req.session._id
        })
        res.redirect("/admin")
    } catch (error) {

    }
})
router.get("/emergency", isAdmin, async function (req, res) {
    const username = req.session.username
    await sendMail({ username: doctorModel.name, email: newDate + time, password: "", type: "RESEDULED" })
})
module.exports = router;
