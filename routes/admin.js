const express = require('express');
// const path = require('path');
const router = express.Router();

// const rootDir = require('../util/path');
const adminCtrl = require('../controllers/admin');

router.get('/add-product', adminCtrl.getAddProductPage);

router.post('/add-product', adminCtrl.postAddProduct);

router.get('/products', adminCtrl.getProductPage);


module.exports = router;
