var express = require('express');
var router = express.Router();
var adminModel = require("../models/Admin")
var doctormodel = require("../models/Doctor")
const isAdmin = require('../middlewares/isAdmin');
const uploads = require('../middlewares/Multer');
const sendMail = require('../utils/sendMail');

function generatePassword(name, prefix) {
    const initials = name.split(" ").map(word => word[0]).join("").toUpperCase();
    const randomNumber = Math.floor(10000 + Math.random() * 90000);
    return `${initials}/${prefix}-${randomNumber}`;
}

function generateUsername(prefix) {
    const timestamp = new Date().getTime().toString();
    return prefix + (+timestamp % 1000000);
}

router.get('/', isAdmin, async (req, res) => {
    try {
        console.log(req.session.role);
        if (req.session.role === 1999) {
            res.render('doctorsDashboard');
        } else {
            const doctors = await doctormodel.find().select("-timing -days -charges -limit");
            res.render('admin', { doctors, username: req.session.username });
        }
    } catch (error) {
        console.error("Error occurred while fetching doctors:", error);
    }
});


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
        req.session.role = user.role;
        req.session.username = user.username;
        console.log("done!");
        res.redirect("/admin");
    } catch (error) {
        res.status(error.status).send(error.message);
    }
});
router.get('/logout', (req, res) => {
    try {
        if (req.session._id == null) {
            throw new Error("User is not logged in");
        }
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
                res.status(500).json({ message: 'Failed to logout' });
            } else {
                res.status(200).json({ message: 'Logout successful' });
            }
        });
    } catch (error) {
        res.status(404).send(error.message);
    }
})

router.post('/newdoctors', uploads.single("image"), async (req, res) => {
    try {
        const {
            name,
            qualification,
            experience,
            speciality,
            email,
            contactNo,
            to,
            from,
            days,
            clinicLocation,
            charges
        } = req.body;

        console.log(req.file?.filename);
        if ([name, qualification, experience, speciality, email, contactNo, from, to, days, clinicLocation, charges].some(field => !field)) {
            const error = new Error("Some fields are required");
            error.status = 400;
            throw error;
        }
        const path = req.file?.filename
        const exists = await doctormodel.findOne({ email })
        if (exists) {
            const error = new Error("Already exists");
            error.status = 409;
            throw error;
        }

        const newDoctor = await doctormodel.create({
            name,
            qualification,
            experience,
            speciality,
            email,
            contactNo,
            timing: `${from} - ${to}`,
            days,
            clinicLocation,
            charges,
            image: path || ""
        });
        console.log(newDoctor);
        if (!newDoctor) {
            const error = new Error("Could not save");
            error.status = 500;
            throw error;
        }

        const password = generatePassword(name, "MP")
        const username = generateUsername("MP")
        console.log(username, password);
        const asAdmin = await adminModel.create({
            fullname: name,
            username,
            password,
            role: 1999
        })
        if (!asAdmin) {
            const error = new Error("Could not save");
            error.status = 500;
            throw error;
        }
        await sendMail({ email, username, password })

        res.status(200).json({ success: true, message: "Done!" })
    } catch (error) {
        console.log(error);
        res.status(error.status).send(error.message);
    }
});

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