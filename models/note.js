const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: {
        type: String, 
        required: true
    }, 
    content: {
        type: String,
    }, 
    userID: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }, 
    categoryId: {
        //type: Schema.Types.ObjectId, 
        //ref: 'Category', 
        type: String,
        // required: true
    },
    tags: [{
        type: String,
        // required: true
        // type: Schema.Types.ObjectId, 
        // ref: 'Tag'
    }]
}, 
{ timestamps: true });
module.exports = mongoose.model('Note', noteSchema);