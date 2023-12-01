//basic system:
const express = require("express");
//path system :
// const path = require("path");
const router = express.Router();
module.exports = router;

//controller system:
const shopController = require("../controllers/shop");

router.get("/shop-cart", shopController.getCart);
router.post("/shop-cart", shopController.postCart);

// router.get("/shop-checkout", shopController.getCheckout);

router.get("/", shopController.getIndex); //the starting page

router.post("/shop-orders", shopController.postOrder);
router.get("/shop-orders", shopController.getOreder);

router.get("/shop-product/:productId", shopController.getProduct); //this is the Product-Detail.ejs use Dynamic route :the route will be defined by the ID od the product

router.get("/products", shopController.getProducts);

router.post("/cart-delete-item", shopController.postDeleteProduct);

router.get("/shop-products", shopController.getProducts);
