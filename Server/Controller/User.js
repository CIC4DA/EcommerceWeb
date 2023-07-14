const User = require('../modal/User');


exports.fetchUserById = async (req,res) => {   
    const {id} = req.user;
    try {
        const user = await User.findById(id).exec();
        res.status(200).json({id:user.id,addresses:user.addresses,email:user.email,role: user.role, orders: user.orders, firstname: user.firstname, lastname: user.lastname});
    } catch (error) {
        res.status(500).json({error : error.message});
    }
}

exports.updateUser = async (req,res) => {
    const {id} = req.params;    
    try {
        const user = await User.findByIdAndUpdate(id,req.body, {new : true});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({error : error.message});
    }
}