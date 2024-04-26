var express = require('express');
var router = express.Router();
var usersModel = require("../models/User")
var doctorsModel = require("../models/Doctor")
var appointmentModel = require("../models/Appointment")
var feedbackModel = require("../models/Feedback")
var isVerified = require("../middlewares/verify");
const sendMain = require("../utils/sendMail")
const { default: mongoose } = require('mongoose');

/* GET users listing. */
router.get("/", isVerified, async (req, res) => {
  const user = await usersModel.findById(req.session._id)
  // console.log(user);
  res.render("userDashboard", { user })
})
router.get("/feedback", isVerified, async (req, res) => {

  try {
    const user = await usersModel.findById(req.session._id).select("-password")
    console.log(user);
    const appointments = await appointmentModel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(req.session._id)// Match appointments for the specified user
        }
      },
      {
        $lookup: {
          localField: "doctorId", // Field from the current collection (appointments)
          from: "doctors", // Collection to perform the lookup
          foreignField: "_id", // Field from the "doctors" collection
          as: "doctor", // Name of the field to add the result to
          pipeline: [
            {
              $project: {
                name: 1, // Project only the 'name' field from the 'doctors' collection
              }
            }
          ]
        }
      },
      {
        $addFields: {
          doctor: { $arrayElemAt: ["$doctor", 0] } // Get the first element of the doctor array
        }
      },
      {
        $project: {
          "doctor": 1,
          "user": 1,
          "status":1
        }
      }
    ]);


    // const appointments = await appointmentModel.find({ _id: req.session._id });

    console.log(appointments);
    res.render("feedback", { user, appointments })
  } catch (error) {
    res.redirect("/users")
  }
})
router.get("/payment", isVerified, async (_, res) => {
  res.render("paymentPage")
})
router.get("/therapist", isVerified, async (req, res) => {
  const allDoctors = await doctorsModel.find()
  const user = await usersModel.findById(req.session._id)
  res.render("BookTherapist", { user, allDoctors })
})
router.post("/register", async function (req, res) {
  try {
    const { fullname, phoneNumber, email, password } = req.body
    console.log(req.body);
    if ([fullname, phoneNumber, email, password].some(item => !item && item.strip() === "")) {
      throw new Error("Please fill up properly!");
    }
    const existsUser = await usersModel.findOne({ email })
    if (existsUser) {
      const error = new Error("User already exists");
      error.status = 409;
      throw error;
    }
    const createdUser = await usersModel.create({
      fullname, phoneNumber, email, password
    })
    if (!createdUser) {
      const error = new Error("Internal server error");
      error.status = 500;
      throw error;
    }
    req.session._id = createdUser._id;
    req.session.fullname = createdUser.fullname;
    res.status(200).json({ message: "Done!" });
  } catch (error) {
    const statusCode = error.status || 500; // Set default status code
    console.log(statusCode);
    res.status(statusCode).send(error.message);
  }
})


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await usersModel.findOne({ email: email });

    if (!user) {
      const error = new Error("Incorrect email or password");
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
    req.session.email = user.email;

    res.status(200).redirect("/users");
  } catch (error) {
    res.status(error.status).send(error.message);
  }
})


router.get('/logout', isVerified, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      const error = new Error("Not verified");
      error.status = 401;
      throw error;
    } else {
      res.redirect("/");
    }
  });
});

router.post("/feedback/:appId", isVerified, async function (req, res) {
  //res.send(req.session._id)
  try {
    const comments = req.body
    const appId = req.params.id
    // TODO: fetch the doctor id from database
    const doctorId = nll
    const createdFeed = feedbackModel.create({
      comments,
      userId,
      doctorId,
    })
    if (!createdFeed) {
      const error = new Error("Server error");
      error.status = 500;
      throw error;
    }
    res.status(200).send("Added feedback")
  } catch (error) {
    res.status(error.status).send(error.message);

  }
})
router.post('/exists', async (req, res) => {
  try {
    const { date, time, doctorId } = req.body
    const dateTime = ` ${date}(${time})`
    const exists = await appointmentModel.findOne({
      $and: [{ dateTime, doctorId }
      ]
    })
    console.log(exists);
    if (exists) {
      const error = new Error("Date and time not available for appointment");
      error.status = 400;
      throw error;
    }
    res.sendStatus(200)
  } catch (error) {
    res.status(error.status).send(error.message);
  }
})
router.post('/new-appointment', isVerified, async function (req, res) {
  try {
    const { fullname, age, gender, issue, doctorId, date, time } = req.body
    console.log(req.body);
    if ([fullname, age, gender, issue, doctorId, date, time].some(item => !item || item.trim() === "")) {
      const error = new Error("Could not find any data..");
      error.status = 400;
      throw error;
    }

    const dateTime = ` ${date}(${time})`
    const appointment = await appointmentModel.create({
      user: {
        fullname,
        age,
        gender,
        issue,
        dateTime,
      },
      doctorId,
      userId: req.session._id,
    })
    if (!appointment) {
      const error = new Error("Server error");
      error.status = 500;
      throw error;
    }
    //TODO: add mail function too
    res.status(200).json({ success: true, message: 'Done' })
  } catch (error) {
    res.status(error.status).send(error.message);

  }
})

router.get("allappointments", isVerified, async function (req, res) {
  try {
    const appoinments = await appointmentModel.find({ userId: req.session._id })
    if (!appoinments) {
      const error = new Error("Server error");
      error.status = 500;
      throw error;
    }
    res.status(200).json(appoinments)
  } catch (error) {
    res.status(error.status).send(error.message);

  }
})

module.exports = router;
