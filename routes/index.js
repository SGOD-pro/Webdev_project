var express = require('express');
var router = express.Router()
const DoctorModel = require('../models/Doctor');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});
router.get('/doctorspage', async function (req, res, next) {
  const doctors = await DoctorModel.aggregate([
    {
      $group: {
        _id: "$qualification.group",
        doctors: { $push: "$$ROOT" }
      },
    }
  ])
  res.render('doctorsPage', { doctors })
});

module.exports = router;
