const Product = require('../modal/Product');

exports.createProduct = async (req, res) => {
    const product = new Product(req.body);
    try {
        const response = await product.save();
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.fetchAllProducts = async (req, res) => {
    let condition = {}
    if (!req.query.admin) {
        condition.deleted = { $ne: true }
    }

    let query = Product.find(condition);
    let totalProductsQuery = Product.find(condition);

    if (req.query.category) {
        query = query.find({ category: req.query.category });
        totalProductsQuery = totalProductsQuery.find({ category: req.query.category });
    }

    if (req.query.brand) {
        query = query.find({ brand: req.query.brand });
        totalProductsQuery = totalProductsQuery.find({ brand: req.query.brand });
    }
    // TODO : SORT BY DISCOUTNED PRICE
    if (req.query._sort && req.query._order) {
        query = query.sort({ [req.query._sort]: req.query._order })
        totalProductsQuery = totalProductsQuery.sort({ [req.query._sort]: req.query._order })
    }

    const totalDocs = await totalProductsQuery.count().exec();

    if (req.query._page && req.query._limit) {
        const pageSize = req.query._limit;
        const page = req.query._page;
        query = query.skip(pageSize * (page - 1)).limit(pageSize);
        totalProductsQuery = totalProductsQuery.skip(pageSize * (page - 1)).limit(pageSize);
    }

    // total products



    try {
        const response = await query.exec();
        // to attach a header
        res.set('X-Total-Count', totalDocs);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


exports.fetchProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}