const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String, 
        required: true
    }, 
    createdBy: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
}, 
{ timestamps: true });
module.exports = mongoose.model('Category', categorySchema);