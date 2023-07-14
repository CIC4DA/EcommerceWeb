const express = require('express');
const { createOrder, fetchOrderByUser, updateOrder, deleteOrder, fetchAllOrders } = require('../Controller/Order');


const router = express.Router();

router.post('/',createOrder);
router.get('/own',fetchOrderByUser);
router.patch('/:id',updateOrder);
router.delete('/:id',deleteOrder);
router.get('/',fetchAllOrders);


exports.router =router;