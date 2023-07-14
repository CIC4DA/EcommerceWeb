const express = require('express');
const { fetchCategories, createCategory } = require('../Controller/Category');


const router = express.Router();

router.get('/',fetchCategories);
router.post('/',createCategory);


exports.router =router;