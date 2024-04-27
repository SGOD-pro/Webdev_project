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

function generateUsername(name) {
    const initials = name.split(" ").map(word => word[0]).join("").toUpperCase();
    const timestamp = new Date().getTime().toString();
    return initials + (+timestamp % 1000000);
}
function getCurrentDate() {
    const currentDate = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = days[currentDate.getDay()];
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const year = currentDate.getFullYear();
    return { date: `${month}/${day}/${year}`, dayOfWeek };
}
function formatName(string) {
    string = string.toLowerCase()
    return string.replace(/\b\w/g, function (char) {
        return char.toUpperCase();
    });
}

router.get('/', isAdmin, async (req, res) => {
    try {
        console.log(req.session._id);
        if (req.session.role === 1999) {
            const doctors = await doctormodel.findOne({ username: req.session.username }).select("-experience -speciality -contactNo -timing -days -clinicLocation -limit -qualification -charges -username");
            console.log(doctors);
            res.render('doctorsDashboard', { doctors, date: getCurrentDate() });
        } else {
            const doctors = await doctormodel.find();
            console.log(doctors);
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
router.get('/logout', isAdmin, (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.error('Error destroying session:', err);
                res.status(500).json({ message: 'Failed to logout' });
            } else {
                res.redirect("/");
            }
        });
    } catch (error) {
        res.status(404).send(error.message);
    }
})

router.post('/newdoctors', isAdmin, uploads.single("image"), async (req, res) => {
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
        let path = req.file?.filename
        const exists = await doctormodel.findOne({ email })
        if (exists) {
            const error = new Error("Already exists");
            error.status = 409;
            throw error;
        }
        let qua = {
            degree: qualification,
            group: ""
        }
        if (qualification.includes("Psychology")) {
            qua.group = "Psychology"
        }
        else {
            qua.group = "Psychiatry"
        }
        const newDoctor = await doctormodel.create({
            name: "Dr. " + formatName(name),
            qualification: qua,
            experience,
            speciality,
            email,
            contactNo,
            timing: `${from} - ${to}`,
            days,
            clinicLocation,
            charges,
            image: "/uploads/" + path || ""
        });
        console.log(newDoctor);
        if (!newDoctor) {
            const error = new Error("Could not save");
            error.status = 500;
            throw error;
        }

        const password = generatePassword(name, "MP")
        const username = generateUsername(name)
        console.log(username, password);
        const asAdmin = await adminModel.create({
            fullname: name,
            username,
            password,
            role: 1999
        })
        newDoctor.username = username;
        await newDoctor.save()
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

router.get("/deletedoctor/:id", isAdmin, async (req, res) => {
    try {
        const _id = req.params.id;
        console.log(_id);
        const deleted = await doctormodel.findByIdAndDelete(_id)

        const frmAdmin = await adminModel.findOneAndDelete({ username: deleted.username })

        if (!frmAdmin || !deleted) {
            const error = new Error("Cannot delete!Internal error");
            error.status = 500;
            throw error;
        }
        res.status(200).json({ success: true, message: "Deleted!" })
    } catch (error) {
        res.status(error.status).send(error.message);
    }
})
module.exports = router;