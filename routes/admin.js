//basic system :
const express = require("express");
//route system
const router = express.Router();
//the path system:
const path = require("path");

//controle system:
const adminController = require("../controllers/admin");

router.get("/products", adminController.getProducts);

router.get("/add-product", adminController.getAddProduct);

router.post("/add-product", adminController.postAddProduct);

router.post("/edit-product", adminController.postEditProduct);

router.get("/edit-product/:productID", adminController.getEditProduct);

router.post("/delete-product", adminController.postDeleteProduct);
module.exports = router; //we don't need to export the routes after controllers
