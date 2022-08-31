const { Joi } = require("express-validation");
Joi.objectId = require("joi-objectid")(Joi);

const categoryNameValidation = Joi.object({
  name: Joi.string().not().empty().required(),
});
const categoryIdValidation = Joi.object({
  categoryId: Joi.objectId().required(),
});
module.exports = {
    createCategory: {body: categoryNameValidation},
    updateCategory: {
      params: categoryIdValidation,
      body: categoryNameValidation,
    },
    getCategoryById: {
      params: categoryIdValidation,
    },
    deleteCategory: {
      params: categoryIdValidation
    }
};
