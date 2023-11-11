const bodyParser = require("body-parser");
const Product = require("../modules/product"); //importing the class from module file
const User = require("../modules/user");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title; //the name attribut in the ejs file
  const imageUrl = req.body.imageUrl; //the name attribut in the ejs file
  const price = req.body.price; //the name attribut in the ejs file
  const description = req.body.description; //the name attribut in the ejs file
  console.log("this is the user object   :", user);
  req.User.createProduct({
    title: title,
      price: price,
      imageUrl: imageUrl,
      description: description,
    })
    .then((result) => {
      console.log("the product has been created succefuly");
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(
        "this is an error in the postAddProduct in Admin controller : ",
        err
      );
    });
}; //save(push) the objetc in the array

exports.postEditProduct = (req, res, next) => {
  //recive the Data from the request + Store it  :
  //the order of the attribut is important : id ,title, imageUrl, description ,price
  const prodId = req.body.productId; //the name of the hidden input Id witch can not be updated
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  Product.findAll({ where: { id: prodId } }) //will return an array montioned in .then
    // .then((products) => {
    //   const product = products[0]
    //   product.title = updatedTitle;
    //   product.price = updatedPrice;
    //   product.imageUrl = updatedImageUrl;
    //   product.description = updatedDesc;
    //   return product.save(); //save in DB
    //   // res.redirect("/admin/products");
    // })
    .then((products) => {
      //save the changes localy in a JS object and not in DB directly :
      products[0].title = updatedTitle;
      products[0].price = updatedPrice;
      products[0].imageUrl = updatedImageUrl;
      products[0].description = updatedDesc;
      return products[0].save(); //save in DB
      // res.redirect("/admin/products");
    })
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

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit; //we have recived in the request have "true" the query param exist
  // console.log(editMode);
  // editMode = true;
  if (!editMode) {
    // console.log("this is an error in params ??");
    // console.log(editMode);
    return res.redirect("/");
  }
  const prodId = req.params.productID; //have recived by the request to have the access to the productID
  Product.findAll({ where: { id: prodId } })
    .then((products) => {
      if (!prodId) {
        //theck if the product existe
        console.log("this is an error in the product existing ??");
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        titlePage: "Edit-product",
        path: "admin/edit-product",
        editing: editMode, //verifier si le produit exsist ??
        product: products[0],
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
  Product.findAll({ where: { id: prodId } }) //find the product to delete
    .then((products) => {
      products[0].destroy(); //delete from DB
    })
    .then((result) => {
      console.log("Prosuct Has been deleted Succefuly ");
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
  Product.findAll() //it doesn't return an array
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
