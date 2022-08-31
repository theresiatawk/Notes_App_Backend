const express = require("express");
const { validate } = require("express-validation");

const validator = require("../validation/tag");
const isAuth = require("../middleware/is-auth");
const tagController = require("../controllers/tag");

const router = express.Router();

router.post( "/tag", isAuth, validate(validator.createTag), tagController.createTag);

module.exports = router;