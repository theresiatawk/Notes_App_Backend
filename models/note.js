const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: {
        type: String, 
        required: true
    }, 
    content: {
        type: String, 
        required: true
    }, 
    userID: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }, 
    categoryId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category'
    }, 
    createdAt: {
        type: Date, 
        default: Date.now()
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Tag'
    }]
});
module.exports = mongoose.model('Note', noteSchema);