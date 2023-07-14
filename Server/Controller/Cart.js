const Cart = require('../modal/Cart');


exports.fetchCartByUser= async (req,res) => {   
    const {id} = req.user;
    try {
        const cartItems = await Cart.find({user:id}).populate('product');
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({error : error.message});
    }
}

exports.addToCart = async (req,res) => {
    const {id} = req.user;
    const cart = new Cart({...req.body,user:id });
    try {
        const response = await cart.save();
        const result = await response.populate('product');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({error : error.message});
    }
}

exports.deleteFromCart = async (req,res) => {
    const {id} = req.params;
    try {
        const cart = await Cart.findByIdAndDelete(id);
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({error : error.message});
    }
}

exports.updateCart = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await Cart.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    const result = await cart.populate('product');

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};