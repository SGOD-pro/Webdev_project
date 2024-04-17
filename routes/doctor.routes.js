var express = require('express');
var router = express.Router();
var doctorModel = require("../models/Doctor")
var appointmentModel = require("../models/Appointment")
var feedbackModel = require("../models/Feedback")
var isVerified = require("../middlewares/verify")


router.get('/all-appointments', isVerified, async (req, res) => {

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
router.get("/emergency", isVerified, async function (req, res) {
    const id=req.session._id
    
})
module.exports = router;
