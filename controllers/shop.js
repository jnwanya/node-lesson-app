const Product = require('../models/product');

exports.getProducts = (request, response, next) => {
    Product.fetchAll(products => {
        response.render('shop/product-list', {products: products,
            pageTitle: 'All Products',
            path: '/products'
        });
    })
};
exports.getIndex = (request, response, next) => {
    Product.fetchAll(products => {
        response.render('shop/index', {products: products,
            pageTitle: 'Shop',
            path: '/'
        });
    })
};

exports.getCart = (request, response, next) => {
    response.render('shop/cart', {
        pageTitle: 'Your Cart',
        path: '/cart'
    });
};

exports.getCheckout = (request, response, next) => {
    response.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout'
    });
};
exports.getOrders = (request, response, next) => {
    response.render('shop/orders', {
        pageTitle: 'My Order',
        path: '/orders'
    });
};
