const path = require('path');

const express = require('express');
const router = express.Router();

const rootDir = require('../util/path');

const adminData = require('./admin');

router.get(['/','/shops','/shop'], (request, response, next) => {
    const products = adminData.products;
    response.render('shop', {products: products,
        pageTitle: 'My Shop',
        path: '/',
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true,
    });
});

module.exports = router;
