const fs = require('fs');
const path = require('path');
const Cart = require('./cart');
const rootDir = require('../util/path');
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

        getProductsFromFile(products => {
            if(this.id ) {
               const existingIndex = products.findIndex(prod => prod.id === this.id);
              // const updatedProducts = [...products];
                products[existingIndex] = this;
            }else {
                this.id = Math.random().toString();
                products.push(this);
            }
            fs.writeFile(productStoragePath, JSON.stringify(products), (error)  => {
                console.log(error);
            });
        })
    }

    static fetchAll(callback) {
        getProductsFromFile(callback);
    }

    static findById(id, callback) {
        getProductsFromFile(products => {
            const product = products.find(existingProduct => existingProduct.id === id);
            callback(product);
        })
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
