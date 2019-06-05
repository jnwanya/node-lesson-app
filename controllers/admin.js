const Product = require('../models/product');
exports.getAddProductPage = (request, response, next) => {
    response.render('admin/add-product', {
            pageTitle: 'Add Product',
            path: '/admin/add-product',
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
    const product = new Product(title, imageUrl, description, price);
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
