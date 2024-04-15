var express = require('express');
var router = express.Router();
var adminModel = require("../models/Admin")
var doctormodel = require("../models/Doctor")
var tipsmodel = require("../models/Tips");
const  isAdmin  = require('../utils/isAdmin');

router.get('/', isAdmin,(req,res) => {
    res.render('admin')
})

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
        res.redirect("admin");
    } catch (error) {
        res.status(500).send(error.message);
    }
});

router.post('/newdoctors', isAdmin, async (req, res) => {
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
        // TODO:   Send username and password via email and add it to the admin database
        res.status(201).json({ message: 'Doctor data saved successfully', doctor: newDoctor, success: true });
    } catch (error) {
        console.error('Error saving doctor data:', error);
        res.status(500).json({ message: 'Failed to save doctor data' });
    }
});

router.get('/getalltips', isAdmin, async (req, res) => {
    try {
        const allTips = await tipsmodel.find()
        if (!allTips) {
            throw new Error("Something is wrong.")
        }
        res.status(200).json(allTips);
    } catch (error) {
        res.status(500).json(error.message);
    }
})

router.get("deletedoctor:id", isAdmin, async (req, res) => {
    try {
        const _id = req.params.id;
        const deleted = await doctormodel.findByIdAndDelete(_id)
        const fromAdmin = await adminModel.findOne({ username: deleted.username })

        await adminModel.findByIdAndDelete(fromAdmin._id)
        // TODO:
    } catch (error) {
        res.status(500).send(error.message)
    }
})
module.exports = router;