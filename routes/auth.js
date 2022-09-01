const express = require('express');
const { validate } = require("express-validation");
const validator = require("../validation/auth");

const User = require('../models/user');
const authController = require('../controllers/auth');

const router = express.Router();

router.put("/signup", validate(validator.signup, {}, { abortEarly: false }),authController.signup);

router.post("/login", authController.login);

module.exports = router;