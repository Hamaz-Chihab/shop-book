const bodyParser = require("body-parser");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

const Product = require("../modules/product"); //importing the class from module file
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title; //the name attribut in the ejs file
  const imageUrl = req.body.imageUrl; //the name attribut in the ejs file
  const price = req.body.price; //the name attribut in the ejs file
  const description = req.body.description; //the name attribut in the ejs file
  const product = new Product(null, title, imageUrl, description, price); //create a new product constractor passing all the attributs .
  product.save(); //save(push) the objetc in the array
  res.redirect("/");
};











exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId; //the name of the hidden input Id witch can not be updated
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  //the order of the attribut is important : id ,title, imageUrl, description ,price
  const updatedProduct = new Product(
    prodId,
    updatedTitle,
    updatedImageUrl,
    updatedDesc,
    updatedPrice
  ); //create a new product object to save it as updated Product
  updatedProduct.save(); //the old values would overided by the updated values
  res.redirect("/admin/products");
};







exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit; //have "true" id the query param exist
  // console.log(editMode);
  // editMode = true;
  if (!editMode) {
    console.log("this is an error in params ??");
    console.log(editMode);
    return res.redirect("/");
  }
  const prodId = req.params.productID; //to have the access to the productID
  Product.findById(prodId, (product) => {
    if (!prodId) {
      //theck if the product existe
      console.log("this is an error in the product existing ??");
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      titlePage: "Edit-product",
      path: "admin/edit-product",
      editing: editMode, //verifier si le produit exsist ??
      product: product,
    });
  });
};






exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.deleteById(prodId); //delete frome the product module
  res.redirect("/shop-cart");
};





exports.getProducts = (req, res, next) => {
  Product.fetchAll((product) => {
    res.render("admin/products", {
      //the ejs file to render it
      prods: product, //prods is used for shop-route and products is in the server
      titlePage: "admin-product",
      path: "/products", //the path of the porte opened
    });
  });
};
