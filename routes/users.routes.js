var express = require('express');
var router = express.Router();
var usersModel = require("../models/User")
var appointmentModel = require("../models/Appointment")
var feedbackModel = require("../models/Feedback")
var isVerified = require("../middlewares/verify")

/* GET users listing. */
router.get("/", isVerified, async (req, res) => {
  res.render("userDashboard")
})

router.post("/register", async function (req, res) {
  try {
    const { fullname, phoneNumber, email, password } = req.body
    console.log(req.body);
    if ([fullname, phoneNumber, email, password].some(item => !item && item.strip() === "")) {
      throw new Error("Please fillup properly!");
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
    req.session.fullname = user.fullname;
    res.redirect("/users");
  } catch (error) {
    console.log(error.status);
    res.status(error.status).send(error.message);
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
    req.session.fullname = user.fullname;
    const data = await usersModel.aggregate([
      {
        $match: { _id: user._id }
      },
      {
        $lookup: {
          from: "appointments",
          foreignField: "userId",
          localField: "_id",
          as: "history",
          pipeline: [
            {
              $lookup: {
                from: "doctors",
                foreignField: "_id",
                localField: "doctorId",
                as: "doctorName",
                pipeline: [
                  {
                    $project:
                    {
                      name: 1
                    }
                  }
                ]
              }
            }
          ]
        }
      },
      {
        $project: {
          password: 0
        }
      }
    ])
    console.log(data);
    res.status(200).redirect("/");
  } catch (error) {
    res.status(error.status).send(error.message);
  }
})

router.post('/logout',isVerified, (req, res) => {
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
});
router.post("/feedback:appId", isVerified, async function (req, res) {
  //res.send(req.session._id)
  try {
    const comments = req.body
    const appId = req.query
    // TODO: fetch the doctor id from database
    const doctorId = nll
    const createdFeed = feedbackModel.create({
      comments,
      userId,
      doctorId,
    })
    if (!createdFeed) {
      throw new Error("Something went wrong.")
    }
    res.status(200).send("Added feedback")

  } catch (error) {
    res.status(500).send(error.message)
  }

})
router.post('/new-appointment', isVerified, async function (req, res) {
  const { fullname, age, gender, issue, doctorId } = req.body
  //TODO: first find the doctor and check if patient limit is full or not 
  //NOTE: Then set a appointment next day according to no of patient records

  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const nextDay = new Date(currentYear, currentMonth, currentDay + 1);

  const nextDayDate = nextDay.getDate();
  const nextDayMonth = nextDay.getMonth() + 1;
  const nextDayDay = nextDay.getDay();

  console.log(` ${nextDayDate}/${nextDayMonth}/${nextDay.getFullYear()}`);

  const dateTime = ` ${nextDayDate}/${nextDayMonth}/${nextDayDay}(Add time)`

  try {
    const appointment = appointmentModel.create({
      user: {
        fullname,
        age,
        gender,
        issue
      },
      doctorId,
      userId,
      dateTime
    })
    if (!appointment) {
      throw new Error("Internal server error")
    }
    //TODO: add mail function too
    res.status(500).send(dateTime)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

router.get("allappointments", isVerified, async function (req, res) {
  try {
    const appoinments = await appointmentModel.find({ userId: req.session._id })
    if (!appoinments) {
      throw new Error("Something went wrong")
    }
    res.status(200).json(appoinments)
  } catch (error) {
    res.status(500).send(error.message)
  }
})

module.exports = router;
