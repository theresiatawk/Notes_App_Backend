const express = require('express');
const { validate } = require("express-validation");
const validator = require("../validation/notes");

const Note = require('../models/user');
const notesController = require('../controllers/notes');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.post("/notes", isAuth, validate(validator.createNote),notesController.createNote);

module.exports = router;