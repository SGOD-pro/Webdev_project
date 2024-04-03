var express = require('express');
var router = express.Router();
var adminModel = require("../models/Admin")
var doctormodel = require("../models/Doctor")
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await adminModel.findOne({ username });
        if (!user) {
            throw new Error("User not found");
        }
        const isCorrect = await user.isPasswordCorrect(password);
        if (!isCorrect) {
            throw new Error("Password is incorrect");
        }
        req.session._id = user._id;
        res.status(200).json({ message: "Login successful", user: {}, success: true });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/newdoctors', async (req, res) => {
    try {
        const {
            name,
            qualification,
            experience,
            speciality,
            email,
            contactNo,
            timing,
            days,
            clinicLocation,
            charges
        } = req.body;
        if ([name, qualification, experience, speciality, email, contactNo, timing, days, clinicLocation, charges].some(field => !field)) {
            throw new Error("Some fields are required.")
        }
        const newDoctor = await doctormodel.create({
            name,
            qualification,
            experience,
            speciality,
            email,
            contactNo,
            timing,
            days,
            clinicLocation,
            charges
        });

        res.status(201).json({ message: 'Doctor data saved successfully', doctor: newDoctor, success: true });
    } catch (error) {
        console.error('Error saving doctor data:', error);
        res.status(500).json({ message: 'Failed to save doctor data' });
    }
});

module.exports = router;