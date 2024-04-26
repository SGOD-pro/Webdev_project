var express = require('express');
var router = express.Router()
const DoctorModel = require('../models/Doctor');
/* GET home page. */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
router.get('/', function (req, res, next) {
  res.render('index', { search: false });
});
router.get('/doctorspage', async function (req, res, next) {
  let doctors = await DoctorModel.aggregate([
    {
      $group: {
        _id: "$qualification.group",
        doctors: { $push: "$$ROOT" }
      },
    }
  ])
  doctors.map((item)=>({...item,doctors:shuffleArray(item.doctors)}))
  console.log(doctors);
  res.render('doctorsPage', { doctors, search: true })
});

module.exports = router;
