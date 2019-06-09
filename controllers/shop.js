const Product = require('../models/product');

exports.getProducts = (request, response, next) => {
    Product.findAll().then(products => {
        response.render('shop/product-list', {products: products,
            pageTitle: 'All Products',
            path: '/products'
        });
    }).catch(err => console.log(err));

};
exports.getProductDetail = (request, response, next) => {
    const productId = request.params.productId;
    Product.findByPk(productId).then(product => {
        response.render('shop/product-detail', {product: product, pageTitle: 'Product Detail', path: '/products'});
    }).catch(error => console.log(error));
};

exports.getIndex = (request, response, next) => {
    Product.findAll().then((products) => {
        response.render('shop/index', {products: products,
            pageTitle: 'Shop',
            path: '/'
        });
    }).catch(err => console.log(err));

};

exports.getCart = (request, response, next) => {
    request.user.getCart().then(cart => {
       return cart.getProducts().then(products => {
           response.render('shop/cart', {
               pageTitle: 'Your Cart',
               path: '/cart',
               products: products
           });
       }).catch(err => console.log(err));
    }).catch(err => console.error(err));
   /* Cart.fetchCart(cart => {
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
    })*/
};

exports.addToCart = (request, response, next) => {
    const productId = request.body.productId;
    let fetchedCart;
    let newQuantity = 1;
    request.user.getCart().then(cart => {
        fetchedCart = cart;
        return cart.getProducts({where : {id: productId}});
    }).then(products => {
        let product;
        if(products.length > 0) {
            product = products[0];
        }
        if(product) {
            const currentQty = product.cartItem.quantity;
            newQuantity = currentQty + 1;
        }
        return Product.findByPk(productId);
    }).then(product => {
        return fetchedCart.addProduct(product, {through: {quantity: newQuantity}});
    }).then(result => {
        response.redirect('/cart');
    }).catch(err => console.error(err));

};

exports.deleteFromCart = (request, response, next) => {
    const productId = request.body.productId;
    request.user.getCart().then(cart => {
        return cart.getProducts({where : {id: productId}});
    }).then(products => {
        const product = products[0];
        return product.cartItem.destroy();
    }).then(() => {
        response.redirect('/cart');
    }).catch(err => console.log(err));
};

exports.getCheckout = (request, response, next) => {
    response.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout'
    });
};
exports.getOrders = (request, response, next) => {
    request.user.getOrders({include: ['products']}).then(orders => {
        response.render('shop/orders', {
            pageTitle: 'My Order',
            path: '/orders',
            orders: orders
        });
    }).catch(err => console.log(err));

};

exports.createOrder = (request, response, next) => {
    const user = request.user;
    let fetchedCart;
    user.getCart().then(cart => {
        fetchedCart = cart;
        return cart.getProducts();
    }).then(products => {
        return user.createOrder().then(order => {
          return order.addProducts(products.map(product => {
              product.orderItem = {quantity: product.cartItem.quantity};
              return product;
          }))
        }).catch(err => console.error(err));
    }).then(result => {
        return fetchedCart.setProducts(null);
    }).then(result => {
        response.redirect('/orders');
    }).catch(err => console.log(err));

};
