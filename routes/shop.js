//basic system: 
const express = require('express');
//path system :
const path = require('path');
const router = express.Router();
module.exports = router;

//controller system:
const shopController = require('../controllers/shop');

router.get('/shop-cart',shopController.getCart);

router.get('/shop-checkout',shopController.getCheckout);

router.get('/', shopController.getIndex);//the starting page 

router.get('/shop-orders',shopController.getOrders);

router.get('/shop-product/:productId',shopController.getProduct)//this is the Product-Detail.ejs use Dynamic route :the route will be defined by the ID od the product  

router.get('/products',shopController.getProducts);







router.get('/shop-products',shopController.getProducts);
