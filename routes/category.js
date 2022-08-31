const express = require("express");
const { validate } = require("express-validation");

const validator = require("../validation/category");
const isAuth = require("../middleware/is-auth");
const categoryController = require("../controllers/category");

const router = express.Router();

router.post( "/category", isAuth, validate(validator.createCategory),categoryController.createCategory);

module.exports = router;