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
    userId: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }, 
    categoryId: {
        type: Schema.Types.ObjectId, 
        ref: 'Category', 
        required: true,
    },
    tags: [{
        type: String, 
        ref: 'Tag',
    }], 
}, 
{ timestamps: true });
module.exports = mongoose.model('Note', noteSchema);