const express = require('express');
// const path = require('path');
const router = express.Router();

// const rootDir = require('../util/path');
const adminCtrl = require('../controllers/admin');

router.get('/add-product', adminCtrl.getAddProductPage);

router.get('/edit-product/:productId', adminCtrl.getEditProductPage);

router.post('/add-product', adminCtrl.postAddProduct);

router.post('/edit-product', adminCtrl.postEditProduct);

router.post('/delete-product', adminCtrl.postDeleteProduct);

router.get('/products', adminCtrl.getProductPage);


module.exports = router;
