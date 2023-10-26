//basic system :
const express = require("express");
//route system
const router = express.Router();
//the path system:
const path = require("path");

//controle system:
const adminController = require("../controllers/admin");
//adim/add-product getmiddleware //add-product postmiddleware ::
router.get("/edit-product", adminController.getEditproduct);
router.post("/add-product", adminController.postAddproduct);

router.get("/edit-product/:productID", adminController.getEditproduct);

//adim/products postmiddleware :
router.get("/products", adminController.getProducts);

module.exports = router; //we don't need to export the routes after controllers
