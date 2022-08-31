const Note = require("../models/note");
const User = require("../models/user");

exports.createNote = async (req, res, next) => {
  const id = req.userId;
  const title = req.body.title;
  const content = req.body.content;
  const categoryId = req.body.categoryId;
  const tags = req.body.tags;

  const note = new Note({
    title: title,
    content: content,
    userId: id,
    categoryId: categoryId,
    tags: tags,
  });
  try {
    const noteResult = await note.save();
    const user = await User.findById(id);
    const userResult = await user.save();
    res.status(201).json({
      message: "Note Created",
      note: noteResult,
      creator: { _id: user._id, name: user.name },
    });

    // res.status(201).send(noteResult);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
exports.updateNote = async (req, res, next) => {
    
};
exports.deleteNote = async (req, res, next) => {
  const noteId = req.params.noteId;
  try {
    const result = await Note.deleteOne({ _id: noteId });
    if (result.deletedCount === 0) {
      const error = new Error(
        "This Note is not found. Deletion unsuccessful."
      );
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
