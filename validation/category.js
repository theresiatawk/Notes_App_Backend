const { Joi } = require("express-validation");

const createCategoryValidation = Joi.object({
  name: Joi.string().not().empty().required(),
});
module.exports = {
    createCategory: {body: createCategoryValidation},
};
