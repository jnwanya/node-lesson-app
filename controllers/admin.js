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
    request.user.createProduct({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description
    }).then(result => {
        console.log('save result', result);
        response.redirect('/');
    }).catch(error => console.log(error));

   /* Product.create({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description
    }).then(result => {
        console.log('save result', result);
        response.redirect('/');
    }).catch(error => console.log(error));*/

};
exports.getProductPage = (request, response, next) => {
    request.user.getProducts().then(products => {
        response.render('admin/products', {
            products: products,
            pageTitle: 'Admin Product',
            path: '/admin/products',
        });
    }).catch(err => console.log(err));
   /* Product.findAll().then(products => {
        response.render('admin/products', {
            products: products,
            pageTitle: 'Admin Product',
            path: '/admin/products',
        });
    }).catch(err => console.log(err));*/
};

exports.getEditProductPage = (request, response, next) => {
    const productId = request.params.productId;
    Product.findByPk(productId).then( product => {
        response.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            product: product,
            editing: true
        });
    }).catch(err => console.log(err));
};

exports.postEditProduct = (request, response, next) => {
    // console.log(request.body);
    const id = request.body.productId;
    const title = request.body.title;
    const description = request.body.description;
    const imageUrl = request.body.imageUrl;
    const price = request.body.price;
    Product.findByPk(id).then(product => {
        product.title = title;
        product.description = description;
        product.imageUrl = imageUrl;
        product.price = price;
        return product.save();
    }).then(result => console.log('product updated', result))
        .catch(err => console.log(err));

    response.redirect('/admin/products');
};
exports.postDeleteProduct = (request, response, next) => {
    const id = request.body.productId;
    Product.findByPk(id).then(product => {
        return product.destroy();
    }).then(result => {
        console.log('product destroyed', result);
        response.redirect('/admin/products');
    }).catch(err => console.log(err));

};
