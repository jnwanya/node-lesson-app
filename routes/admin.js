const express = require('express');
const path = require('path');
const router = express.Router();

const rootDir = require('../util/path');

const products = [];

router.get('/add-product',(request, response, next) => {
    // console.log('In a middleware');
    //response.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    response.render('add-product', {pageTitle: 'Add Product', path: '/admin/add-product'});
    //let content = '<form action="/product" method="post"><input type="text" name="title" /><button type="submit">Add product</button></form>';
   // response.send(content);
});

router.post('/add-product', (request, response, next) => {
   // console.log(request.body);
    products.push({title: request.body.title});
    response.redirect('/');
});


module.exports = {router: router, products: products};
