const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');
const dataStoragePath = path.join(rootDir, 'data', 'carts.json');

module.exports = class Cart {
    static addProduct(id, productPrice) {
         fs.readFile(dataStoragePath, (err, content) => {
             let cart = {products: [], totalPrice: 0};
             if(!err) {
                cart = JSON.parse(content);
             }
             const existingProdIndex = cart.products.findIndex(product => product.id === id);
             const existingProd = cart.products[existingProdIndex];
             let updatedProd;
             if(existingProd) {
                 updatedProd = {...existingProd};
                 updatedProd.qty = updatedProd.qty + 1;
                 cart.products[existingProdIndex] = updatedProd;

             }else {
                 updatedProd = {id: id, qty: 1};
                 cart.products = [...cart.products, updatedProd];
             }
             cart.totalPrice += +productPrice;
             fs.writeFile(dataStoragePath, JSON.stringify(cart), err => {
                console.error(err);
             })
         })
    }

    static deleteProduct(id, productPrice) {
        fs.readFile(dataStoragePath, (err, content) => {
            if(err) {
                return;
            }
            let cart = JSON.parse(content);
            const updatedCart = {...cart};
            const product = updatedCart.products.find(prod => prod.id === id);
            if(!product) {
                return;
            }
            updatedCart.totalPrice = updatedCart.totalPrice - (product.qty * productPrice);
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
            console.log('cart after update', updatedCart);
            fs.writeFile(dataStoragePath, JSON.stringify(updatedCart), err => {
                console.error(err);
            })
        })
    }

    static fetchCart(callback) {
        fs.readFile(dataStoragePath, (err, content) => {
            if (err) {
                return callback(null);
            }
            const cart = JSON.parse(content);
            callback(cart);
        })
    }

};
