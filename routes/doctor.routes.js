var express = require('express');
var router = express.Router();
var doctorModel = require("../models/Doctor")
var appointmentModel = require("../models/Appointment")
var feedbackModel = require("../models/Feedback")
var isAdmin = require("../middlewares/isAdmin")

router.get('/allpatients',isAdmin, async (req, res) => {
    const doctors = await doctorModel.findOne({ username: req.session.username }).select("-experience -speciality -contactNo -timing -days -clinicLocation -limit -qualification -charges -username");
    console.log(doctors);
    res.render('allPatient',{doctors})
})
router.get('/sessioninfo',isAdmin, async (req, res) => {
    const doctors = await doctorModel.findOne({ username: req.session.username }).select("-experience -speciality -contactNo -timing -days -clinicLocation -limit -qualification -charges -username");
    console.log(doctors);
    res.render('sessionInfo',{doctors})
})
router.get('/profile',isAdmin, async (req, res) => {
    const doctors = await doctorModel.findOne({ username: req.session.username }).select("-username");
    console.log(doctors);
    res.render('DoctorProfile',{doctors})
})
router.get('/all-appointments', isAdmin, async (req, res) => {

    try {
        const allAppointment = await appointmentModel.find({ doctorId: req.session._id })
        if (!allAppointment) {
            throw new Error("User not found")
        }
        res.status(200).json(allAppointment)
    } catch (error) {
        res.status(404).send(error.message)

    }
})

router.get("/emergency", isAdmin, async function (req, res) {
    const id = req.session._id
})
module.exports = router;
