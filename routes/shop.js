//basic system: 
const express = require('express');
//path system :
const path = require('path');
const router = express.Router();
module.exports = router;

//controller system:
const shopController = require('../controllers/shop');

//shop/product getmiddleware :
router.get('/', shopController.getIndex);//the starting page 

router.get('/products',shopController.getProducts);

router.get('/shop-product/:productId',shopController.getProduct)//Dynamic route :the productId could be anny thing ex: 12345

router.get('/shop-cart',shopController.getCart);

router.get('/shop-checkout',shopController.getCheckout);

router.get('/shop-orders',shopController.getOrders);