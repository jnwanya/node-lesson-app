const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');
const productStoragePath = path.join(rootDir, 'data', 'products.json');

const getProductsFromFile = (callback) => {
    fs.readFile(productStoragePath, (err, content) => {
        if(err) {
            callback([]);
        }else {
            let products = JSON.parse(content);
            console.log(products);
            callback(products);
        }
    });
};

module.exports = class Product {
    constructor(title) {
       this.title = title;
    }
    save() {
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(productStoragePath, JSON.stringify(products), (error)  => {
                console.log(error);
            });
        })
    }

    static fetchAll(callback) {
        getProductsFromFile(callback);
    }
};
