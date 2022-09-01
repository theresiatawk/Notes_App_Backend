const Category = require("../models/category");
const User = require("../models/user");
const Note = require("../models/note");

exports.createCategory = async (req, res, next) => {
  const id = req.userId;
  const name = req.body.name;
  try {
    const foundCategory = await Category.findOne({ name: name });
    //category already exists
    if (foundCategory) {
      return res.status(409).json({
        message: "Category already exists.",
      });
    }
    const category = new Category({
      name: name,
      createdBy: id,
    });

    const categoryResult = await category.save();
    const user = await User.findById(id);
    const userResult = await user.save();
    res.status(201).json({
      message: "Category Created",
      category: categoryResult,
      creator: { _id: user._id, name: user.name },
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({});
    if (categories.length === 0) {
      return res.status(409).json({
        message: "No Categories found",
      });
    }
    res.status(200).send(categories);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.getCategoryById = async (req, res, next) => {
  const categoryId = req.params.categoryId;
  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      const error = new Error("Category Not Found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).send(category);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.updateCategory = async (req, res, next) => {
  const categoryId = req.params.categoryId;
  const name = req.body.name;
  console.log(categoryId);

  try {
    const categoryFound = await Category.findById(categoryId);
    if (!categoryFound) {
      const error = new Error("Category Not Found");
      error.statusCode = 404;
      throw error;
    }
    const result = await Category.updateOne(
      { _id: categoryId },
      { $set: { name: name } }
    );
    const categoryUpdated = await Category.findById(categoryId);
    res.status(200).json({
      message: "Category updated successfully",
      updatedCategory: categoryUpdated,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.deleteCategory = async (req, res, next) => {
  const categoryId = req.params.categoryId;
  try {
  const notesOfThisCatCount = await Note.find({
    category: categoryId,
  }).countDocuments();
  if (notesOfThisCatCount > 0) {
    const error = new Error("Cannot delete this category, it's linked to notes.");
    error.statusCode = 401;
    throw error;
  }

    const result = await Category.deleteOne({ id: categoryId });
    if(result.deletedCount === 0){
        const error = new Error("This Category is not found. Deletion unsuccessful.");
        error.statusCode = 401;
        throw error;
    }
    res.status(200).json({message: "Deleted Successfully"});
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
