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
function getRandomValues(array, count) {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

router.get('/doctorspage', async function (req, res, next) {
  let doctors = await DoctorModel.aggregate([
    {
      $group: {
        _id: "$qualification.group",
        doctors: { $push: "$$ROOT" }
      },
    }
  ])
  const slider = await DoctorModel.aggregate([
    { $sample: { size: 7 } },
    {
      $project: {
        name: 1,
        speciality: 1,
        experience: 1,
        clinicLocation: 1,
        image: 1
      }
    }
  ])
  doctors.map((item) => ({ ...item, doctors: shuffleArray(item.doctors) }))
  console.log(slider);
  res.render('doctorsPage', { doctors, search: true, slider })
});

module.exports = router;
