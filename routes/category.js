const express = require("express");
const { validate } = require("express-validation");

const validator = require("../validation/category");
const isAuth = require("../middleware/is-auth");
const categoryController = require("../controllers/category");

const router = express.Router();

router.post( "/category", isAuth, validate(validator.createCategory),categoryController.createCategory);
router.get("/category/:categoryId", isAuth, validate(validator.getCategoryById), categoryController.getCategoryById);
router.get("/category", isAuth, categoryController.getCategories);
router.put("/category/:categoryId", isAuth,validate(validator.updateCategory),categoryController.updateCategory);
router.delete("/category/:categoryId", isAuth, validate(validator.deleteCategory), categoryController.deleteCategory);



module.exports = router;