var express = require('express');
var router = express.Router()
var isVerified = require("../utils/verify")
var tipsModel = require('../models/Tips')
/* GET home page. */
router.get('/', function (req, res, next) {

  res.render('index', { isLoggedIn: req.session._id ? true : false });
});
router.post("add-tips", isVerified, async function (req, res) {
  try {
    const { tips } = req.body
    const createdTip = await tipsModel.create({
      tips,
      uploder: req.session._id || "Someone"
    })
    res.status(200).json(createdTip)
  } catch (error) {
    res.status(500).send("Internal Server Error")
  }
})

router.get('/delete-tip:tipId', isVerified, async function (req, res) {
  try {
    const deleted = tipsModel.findByIdAndDelete({ tipId: req.params.tipId })
    if (!deleted) {
      throw new Error(`Tip ${req.params.tipId} not found`)
    }
    res.status(200).json("deleted")
  } catch (error) {
    res.status(500).send(error.message)
  }
})

module.exports = router;
