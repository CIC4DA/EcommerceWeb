const Brand = require('../modal/Brand');


exports.fetchBrands = async (req,res) => {    
    try {
        const brands = await Brand.find({}).exec();
        res.status(200).json(brands);
    } catch (error) {
        res.status(500).json({error : error.message});
    }
}

exports.createBrand = async (req,res) => {
    const brand = new Brand(req.body);
    try {
        const response = await brand.save();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({error : error.message});
    }
}