const Order = require('../modal/Order');


exports.fetchOrderByUser= async (req,res) => {   
    const {id} = req.user;
    try {
        const orders = await Order.find({user:id});
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({error : error.message});
    }
}

exports.createOrder = async (req,res) => {
    const order = new Order(req.body);
    try {
        const response = await order.save();
        
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({error : error.message});
    }
}


exports.deleteOrder = async (req,res) => {
    const {id} = req.params;
    try {
        const order = await Order.findByIdAndDelete(id);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({error : error.message});
    }
}

exports.updateOrder = async (req,res) => {
    const {id} = req.params;    
    try {
        const order = await Order.findByIdAndUpdate(id,req.body, {new : true});
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({error : error.message});
    }
}

exports.fetchAllOrders = async (req,res) => {
    let query = Order.find({deleted: {$ne:true}});
    // copy of query to fetch count
    let totalOrdersQuery = Order.find({deleted: {$ne:true}});

    // TODO : SORT BY DISCOUTNED PRICE
    if(req.query._sort && req.query._order){
        query =query.sort({[req.query._sort] : req.query._order})
        totalOrdersQuery =totalOrdersQuery.sort({[req.query._sort] : req.query._order})
    }

    const totalDocs = await totalOrdersQuery.count().exec();

    if(req.query._page && req.query._limit){
        const pageSize = req.query._limit;
        const page = req.query._page;
        query = query.skip(pageSize*(page-1)).limit(pageSize);
        totalOrdersQuery = totalOrdersQuery.skip(pageSize*(page-1)).limit(pageSize);
    }

    try {
        const response = await query.exec();
        // to attach a header
        res.set('X-Total-Count',totalDocs);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({error : error.message});
    }
}