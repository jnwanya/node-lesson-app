const Product = require('../models/product');
const products = [];
exports.getAddProductPage = (request, response, next) => {

    response.render('add-product',
        {
            pageTitle: 'Add Product',
            path: '/admin/add-product',
            formCSS: true,
            productCSS: true,
            activeProduct: true});
    //response.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    //let content = '<form action="/product" method="post"><input type="text" name="title" /><button type="submit">Add product</button></form>';
    // response.send(content);
};
exports.postAddProduct = (request, response, next) => {
    // console.log(request.body);
    const product = new Product(request.body.title);
    product.save();
    response.redirect('/');
};

exports.getProducts = (request, response, next) => {
    Product.fetchAll(products => {
        response.render('shop', {products: products,
            pageTitle: 'My Shop',
            path: '/',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true,
        });
    })

}
