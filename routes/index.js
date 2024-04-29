var express = require('express');
var router = express.Router()
const DoctorModel = require('../models/Doctor');


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
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
router.get('/', (req, res) => {
  res.render('index', { search: false })
})
router.get('search', async (req, res) => {
  const searchValue = req.query.value;
  console.log(searchValue);
  const regex = new RegExp(searchTerm.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'i');
  res.sendStatus(200)
})
router.get('/contactus', (req, res) => {
  res.render('contactus')
})


module.exports = router;
