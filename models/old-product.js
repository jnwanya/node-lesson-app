const fs = require('fs');
const path = require('path');
const Cart = require('./cart');
const rootDir = require('../util/path');
const dbConn = require('../util/database');
const productStoragePath = path.join(rootDir, 'data', 'products.json');

const getProductsFromFile = (callback) => {
    fs.readFile(productStoragePath, (err, content) => {
        if(err) {
            callback([]);
        }else {
            let products = JSON.parse(content);
            callback(products);
        }
    });
};

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
           this.id = id;
           this.title = title;
           this.imageUrl = imageUrl;
           this.description = description;
           this.price = price;
    }
    save() {
        return dbConn.execute('INSERT INTO product (title, price, description, imageUrl) VALUES (?, ?, ?, ?)',
            [this.title, this.price, this.description, this.imageUrl]);
    }

    static fetchAll() {
        return dbConn.execute('SELECT * FROM product')
    }

    static findById(id) {
        return dbConn.execute('SELECT * FROM product where id = ?', [id]);
    }
    static deleteById(id) {
        getProductsFromFile(products => {
            const product = products.find(prod => prod.id === id);
            const updatedProducts = products.filter(existingProduct => existingProduct.id !== id);
           // const product = products[productIndex];
           // const updatedProducts = products.slice(productIndex, 1);
            fs.writeFile(productStoragePath, JSON.stringify(updatedProducts), (error)  => {
                if(!error) {
                    Cart.deleteProduct(id, product.price);
                }
            });
        })
    }
};
