const mongoose = require("mongoose");
const Note = require("../models/note");
const User = require("../models/user");
const Category = require("../models/category");
const { tag } = require("@hapi/joi/lib/base");

exports.createNote = async (req, res, next) => {
  const id = req.userId;
  const title = req.body.title;
  const content = req.body.content;
  const categoryId = req.body.categoryId;
  const tags = req.body.tags;
  try {
    const categoryFound = await Category.findById(categoryId);
    if (!categoryFound) {
      const error = new Error(
        "This Category Id is not Found. Kindly change your category id"
      );
      error.statusCode = 404;
      throw error;
    }
    const note = new Note({
      title: title,
      content: content,
      userId: id,
      categoryId: categoryId,
      tags: tags,
    });
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
exports.getNotes = async (req, res, next) => {
  const userId = req.userId;
  const categoryId = req.body.categoryId;
  const tagName = req.body.tagName;

  const filters = {};
  try {
    if (categoryId) {
      filters.categoryId = mongoose.Types.ObjectId(categoryId);
    }
    if (tagName) {
      filters.tags = { $in: [tagName.toString()] };
    }
    const notesAggregation = [
      { $match: { userId: mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "Category",
        },
      },
      // { $unwind: { path: "$tags", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "tags",
          localField: "tags",
          foreignField: "_id",
          as: "Tags",
        },
      },
      { $sort: { updateAt: -1 } },
    ];

    if (Object.keys(filters).length > 0) {
      notesAggregation.unshift({ $match: filters });
    }
    const notes = await Note.aggregate(notesAggregation);
    if (notes.length === 0) {
      res.status(200).json({
        message: "No Notes Found",
      });
    } else {
      res.status(200).json({
        Note: notes,
      });
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
exports.updateNote = async (req, res, next) => {
  const noteId = req.params.noteId;
  const title = req.body.title;
  const content = req.body.content;
  const categoryId = req.body.categoryId;
  const tags = req.body.tags;
  try {
    const noteFound = await Note.findById(noteId);
    if (!noteFound) {
      const error = new Error("Note Not Found");
      error.statusCode = 404;
      throw error;
    }
    const categoryFound = await Category.findById(categoryId);
    if (!categoryFound) {
      const error = new Error(
        "This Category Id Not Found. Kindly change your category id"
      );
      error.statusCode = 404;
      throw error;
    }
    const result = await Note.updateOne(
      { _id: noteId },
      {
        $set: {
          title: title,
          content: content,
          categoryId: categoryId,
          tags: tags,
        },
      }
    );
    const updatedNote = await Note.findById(noteId);
    res.status(200).json({
      message: "Note updated successfully",
      updatedNote: updatedNote,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.deleteNote = async (req, res, next) => {
  const noteId = req.params.noteId;
  try {
    const result = await Note.deleteOne({ _id: noteId });
    if (result.deletedCount === 0) {
      const error = new Error("This Note is not found. Deletion unsuccessful.");
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
