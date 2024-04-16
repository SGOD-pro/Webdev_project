var express = require('express');
var router = express.Router()
var isVerified = require("../middlewares/verify")
var tipsModel = require('../models/Tips')
/* GET home page. */
router.get('/', function (req, res, next) {

  res.render('index', { isLoggedIn: req.session._id ? true : false });
});
router.get('/doctorspage', function (req, res, next) {
  res.render('doctorsPage')
});

module.exports = router;
