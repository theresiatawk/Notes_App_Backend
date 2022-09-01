const express = require('express');
const { validate } = require("express-validation");
const validator = require("../validation/notes");

const Note = require('../models/user');
const notesController = require('../controllers/notes');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get("/notes", isAuth, notesController.getNotes);
router.post("/notes", isAuth, validate(validator.createNote), notesController.createNote);
router.put("/notes/:noteId", isAuth, validate(validator.updateNote), notesController.updateNote);
router.delete("/notes/:noteId",isAuth, validate(validator.deleteNote), notesController.deleteNote);

module.exports = router;