var express = require('express');
var router = express.Router();
var adminModel = require("../models/Admin")
var doctormodel = require("../models/Doctor")
var tipsmodel = require("../models/Tips");
const isAdmin = require('../middlewares/isAdmin');
const uploads = require('../middlewares/Multer');
router.get('/', (req, res) => {
    res.render('admin')
})

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(req.body);
        const user = await adminModel.findOne({ username });
        if (!user) {
            const error = new Error("Invalid username or password");
            error.status = 404;
            throw error;
        }
        const isCorrect = await user.isPasswordCorrect(password);
        if (!isCorrect) {
            const error = new Error("Incorrect password");
            error.status = 401;
            throw error;
        }
        req.session._id = user._id;
        res.redirect("admin");
    } catch (error) {
        res.status(error.status).send(error.message);

    }
});

router.post('/newdoctors', isAdmin, uploads.single("picture"), async (req, res) => {
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
        console.log(req.body);
        if ([name, qualification, experience, speciality, email, contactNo, timing, days, clinicLocation, charges].some(field => !field)) {
            const error = new Error("Some fields are required");
            error.status = 400;
            throw error;
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
        if (!newDoctor) {
            const error = new Error("Could not save");
            error.status = 500;
            throw error;
        }
        // TODO:   Send username and password via email and add it to the admin database
        res.status(200).json({ message: 'Doctor data saved successfully', doctor: newDoctor, success: true });
    } catch (error) {
        res.status(error.status).send(error.message);
    }
});

// router.get('/getalltips', isAdmin, async (req, res) => {
//     try {
//         const allTips = await tipsmodel.find()
//         if (!allTips) {
//             throw new Error("Something is wrong.")
//         }
//         res.status(200).json(allTips);
//     } catch (error) {
//         res.status(500).json(error.message);
//     }
// })

router.get("deletedoctor:id", isAdmin, async (req, res) => {
    try {
        const _id = req.params.id;
        const deleted = await doctormodel.findByIdAndDelete(_id)
        const frmAdmin = await adminModel.findByIdAndDelete(deleted._id)
        if (!frmAdmin || !deleted) {
            const error = new Error("Cannot delete!Internal error");
            error.status = 500;
            throw error;
        }
        // TODO:

    } catch (error) {
        res.status(error.status).send(error.message);
    }
})
module.exports = router;