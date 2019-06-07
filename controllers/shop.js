const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (request, response, next) => {
    Product.fetchAll(products => {
        response.render('shop/product-list', {products: products,
            pageTitle: 'All Products',
            path: '/products'
        });
    })
};
exports.getProductDetail = (request, response, next) => {
    const productId = request.params.productId;
    Product.findById(productId, product => {
        response.render('shop/product-detail', {product: product, pageTitle: 'Product Detail', path: '/products'});
    });
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
    Cart.fetchCart(cart => {
        const cartProducts = [];
        Product.fetchAll(products => {
            for(let product of products) {
                const cartProduct = cart.products.find(prod => prod.id === product.id)
                if(cartProduct) {
                    cartProducts.push({productData: product, qty: cartProduct.qty});
                }
            }
            response.render('shop/cart', {
                pageTitle: 'Your Cart',
                path: '/cart',
                products: cartProducts
            });
        });
    })
};

exports.addToCart = (request, response, next) => {
    const productId = request.body.productId;
    console.log(productId);
    Product.findById(productId, product => {
        Cart.addProduct(productId, product.price);
    });
    response.redirect('/cart');
};

exports.deleteFromCart = (request, response, next) => {
    const productId = request.body.productId;
    Product.findById(productId, product => {
        Cart.deleteProduct(productId, product.price);
        response.redirect('/cart');
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
