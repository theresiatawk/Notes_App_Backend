const { Joi } = require("express-validation");

const signupValidation = Joi.object({
    email: 
    Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().not().empty().required(),
});

module.exports = {
    signup: {body: signupValidation}
};