const Tag = require('../models/tag');
const User = require("../models/user");

exports.createTag= async (req, res, next) => {
    
    const id = req.userId;
    const name = req.body.name;
    
    const tag = new Tag({
        name: name, 
        createdBy: id, 
    });
    try {
        const tagResult = await tag.save();
        const user = await User.findById(id);
        const userResult = await user.save();
        res.status(201).json({
            message: "TAG Created",
            tag: tagResult, 
            creator: {_id: user._id, name: user.name}
        });
    }
    catch(error){
        if (!error.statusCode) {
            error.statusCode = 500;
          }
          next(error);
    }

};