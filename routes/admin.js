const express = require('express');
// const path = require('path');
const router = express.Router();

// const rootDir = require('../util/path');
const productCtrl = require('../controllers/products');

router.get('/add-product', productCtrl.getAddProductPage);

router.post('/add-product', productCtrl.postAddProduct);


module.exports = router;
