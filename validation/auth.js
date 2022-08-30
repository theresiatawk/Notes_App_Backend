const { Joi } = require("express-validation");

const signupValidation = Joi.object({
    email: 
    Joi.string()
    .email()
    .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("E-Mail address already exists!");
          }
        });
    })
    .required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().not().empty().required(),
});

module.exports = {
    signup: {body: signupValidation}
};


  
