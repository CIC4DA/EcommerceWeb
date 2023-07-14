const express = require('express');
const { fetchUserById, updateUser } = require('../Controller/User');


const router = express.Router();
router.get('/own',fetchUserById);
router.patch('/:id',updateUser);


exports.router =router;