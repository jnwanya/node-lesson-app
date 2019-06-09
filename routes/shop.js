const express = require('express');
const router = express.Router();

const shopController = require('../controllers/shop');

router.get(['/','/shop'], shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProductDetail);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.addToCart);

router.post('/delete-cart-item', shopController.deleteFromCart);

router.get('/checkout', shopController.getCheckout);

router.get('/orders', shopController.getOrders);

router.post('/create-order', shopController.createOrder);

module.exports = router;
