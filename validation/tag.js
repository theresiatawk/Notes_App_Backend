const { Joi } = require("express-validation");

const createTagValidation = Joi.object({
  name: Joi.string().not().empty().required(),
});
module.exports = {
    createTag: {body: createTagValidation}
};
