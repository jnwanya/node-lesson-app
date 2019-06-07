const Product = require('../models/product');
exports.getAddProductPage = (request, response, next) => {
    response.render('admin/edit-product', {
            pageTitle: 'Add Product',
            path: '/admin/add-product',
            editing: false
    });
    //response.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    //let content = '<form action="/product" method="post"><input type="text" name="title" /><button type="submit">Add product</button></form>';
    // response.send(content);
};
exports.postAddProduct = (request, response, next) => {
    // console.log(request.body);
    const title = request.body.title;
    const description = request.body.description;
    const imageUrl = request.body.imageUrl;
    const price = request.body.price;
    const product = new Product(null, title, imageUrl, description, price);
    product.save();
    response.redirect('/');
};
exports.getProductPage = (request, response, next) => {
    Product.fetchAll(products => {
        response.render('admin/products', {
            products: products,
            pageTitle: 'Admin Product',
            path: '/admin/products',
        });
    });
};
exports.getEditProductPage = (request, response, next) => {
    const productId = request.params.productId;
    Product.findById(productId, product => {
        response.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            product: product,
            editing: true
        });
    })

};
exports.postEditProduct = (request, response, next) => {
    // console.log(request.body);
    const id = request.body.productId;
    const title = request.body.title;
    const description = request.body.description;
    const imageUrl = request.body.imageUrl;
    const price = request.body.price;
    const product = new Product(id, title, imageUrl, description, price);
    product.save();
    response.redirect('/admin/products');
};
exports.postDeleteProduct = (request, response, next) => {
    const id = request.body.productId;
    Product.deleteById(id);
    response.redirect('/admin/products');
};
