const express = require('express');
const { addToCart, fetchCartByUser, updateCart, deleteFromCart } = require('../Controller/Cart');


const router = express.Router();

router.get('/',fetchCartByUser);
router.post('/',addToCart);
router.patch('/:id',updateCart);
router.delete('/:id',deleteFromCart);


exports.router =router;