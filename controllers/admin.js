const Product = require("../modules/product"); //importing the class from module file
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId; //extract the ObjID fct out of mongodb
const User = require("../modules/user.js");
exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};
exports.postAddProduct = (req, res, next) => {
  const prodId = req.body.productID;
  const title = req.body.title; //the name attribut in the ejs file
  const imageUrl = req.body.imageUrl; //the name attribut in the ejs file
  const price = req.body.price; //the name attribut in the ejs file
  const description = req.body.description; //the name attribut in the ejs file
  console.log("user in addProduct  in the admin controller :", req.user);
  var userId = new ObjectId(req.user._id);
  const product = new Product(
    title,
    price,
    description,
    imageUrl,
    null,
    userId
  );
  // console.log("this is the user object   :", user);
  product
    .save()
    .then(() => {
      console.log("Updated Product succefuly");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(
        "this is an error in the postAddProduct in Admin controller : ",
        err
      );
    });
};
//responsible for saving these changes to DB recive the Data from the request + Store it  :
exports.postEditProduct = (req, res, next) => {
  //the order of the attribut is important : id ,title, imageUrl, description ,price
  const prodId = req.body.productId; //the name of the hidden input Id witch can not be updated
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  const product = new Product(
    updatedTitle,
    updatedPrice,
    updatedDesc,
    updatedImageUrl,
    new ObjectId(prodId)
  );
  product
    .save()
    .then((result) => {
      console.log("the product has been UPDATED SUCCEFULY");
      res.redirect("/admin/products");
    })
    .catch((err) =>
      console.log(
        "this is an err in the postEditProduct in admin controller : ",
        err
      )
    );
};
//Responsible for fetching the data that should be edited and for rendering it
exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit; //we have recived in the request have "true" the query param exist
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productID; //have recived by the request to have the access to the productID
  // Product.findAll({ where: { id: prodId } })//cas 1
  Product.findById(prodId)
    .then((product) => {
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
    })
    .catch((err) => {
      console.log(
        "this is an error in GetEditProduct in admin controller :",
        err
      );
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.DeleteById(prodId)
    .then((result) => {
      res.redirect("/admin/products");
    })
    .catch((err) =>
      console.log(
        "this is an error in postDeleteProduct in admin Controller :",
        err
      )
    );
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll() //it doesn't return an array
    .then((products) => {
      res.render("admin/products", {
        //the ejs file to render it
        prods: products, //prods is used for shop-route and products is in the server
        titlePage: "admin-product",
        path: "/products", //the path of the porte opened
      });
    })
    .catch((err) => {
      console.log(
        "this is an error from GetProducts in admin controller : ",
        err
      );
    });
};
