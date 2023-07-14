const Category = require('../modal/Category');


exports.fetchCategories = async (req,res) => {    
    try {
        const categories = await Category.find({}).exec();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({error : error.message});
    }
}

exports.createCategory = async (req,res) => {
    const category = new Category(req.body);
    try {
        const response = await category.save();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({error : error.message});
    }
}