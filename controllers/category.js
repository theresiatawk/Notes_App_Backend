const Category = require('../models/category');
const User = require("../models/user");

exports.createCategory = async (req, res, next) => {
    
    const id = req.userId;
    const name = req.body.name;
    
    const category = new Category({
        name: name, 
        createdBy: id, 
    });
    try {
        const categoryResult = await category.save();
        const user = await User.findById(id);
        const userResult = await user.save();
        res.status(201).json({
            message: "Category Created",
            category: categoryResult, 
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