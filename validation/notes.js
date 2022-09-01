const { Joi } = require("express-validation");
Joi.objectId = require("joi-objectid")(Joi);

const createNoteValidation = Joi.object({
    title: Joi.string().not().empty().required(),
    content: Joi.string().not().empty().required(),
    categoryId: Joi.objectId().required(),
    tags: Joi.array().items(Joi.string()),
});
const noteIdValidation = Joi.object({
    noteId: Joi.objectId().required(),
});
module.exports = {
    createNote:{body: createNoteValidation},
    deleteNote:{params: noteIdValidation},
    updateNote:{params: noteIdValidation, body: createNoteValidation}
};
