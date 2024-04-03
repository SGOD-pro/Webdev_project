var express = require('express');
var router = express.Router();
var usersModel = require("../models/User")
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('this is users dashboard');
});

router.post("/register", async function (req, res) {
  try {
    const { fullname, phoneNumber, email, password } = req.body
    if ([fullname, phoneNumber, email, password].some(item => !item && item.strip() === "")) {
      throw new Error("Please fillup porpoerly!");
    }
    const existsUser = await usersModel.findOne({ email })
    if (existsUser) {
      throw new Error("User already exists");
    }
    const createdUser = await usersModel.create({
      fullname, phoneNumber, email, password
    })
    if (!createdUser) {
      throw new Error("Internal server error");
    }
    req.session._id = createdUser._id;
    const user = await usersModel.findById(req.session._id).select("-password")
    res.status(200).json({ message: "Successfully registered", user, success: true });
  } catch (error) {
    res.status(500).send(error.message);
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await usersModel.findOne({ email: email });
    if (!user) {
      throw new Error("User not found");
    }
    const isCorrect = await user.isPasswordCorrect(password);
    if (!isCorrect) {
      throw new Error("Password is incorrect");
    }
    req.session._id = user._id;
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
          pipeline:[

          ]
        }
      },
      {
        $project:{
          password: 0
        }
      }
    ])
    res.status(200).json({ message: "Login successful", data, success: true });
  } catch (error) {
    res.status(500).send(error.message);
  }
})

router.post('/logout', (req, res) => {
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
router.post("/feedback", async function (req, res) {
  res.send(req.session._id)
})

module.exports = router;
