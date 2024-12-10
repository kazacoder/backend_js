const ProductController = require('../controllers/product');
const express = require('express');

const router = express.Router();

router.get('/', ProductController.getProducts)

module.exports = router;