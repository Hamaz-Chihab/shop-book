var bodyParser = require("body-parser");

// for routes looking like this `/products?page=1&pageSize=50`
// app.get('/products', function(req, res) {
//   const page = req.query.page;
//   const pageSize = req.query.pageSize;
//   res.send(`Filter with parameters ${page} and ${pageSize});`
// });

const Product = require("../modules/product"); //importing the class from module file
exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product.ejs", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

//middleware function of admin route :
exports.postAddProduct = (req, res, next) => {
  const title = req.body.title; //the name attribut in the ejs file
  const imageUrl = req.body.imageUrl; //the name attribut in the ejs file
  const price = req.body.price; //the name attribut in the ejs file
  const description = req.body.description; //the name attribut in the ejs file
  const product = new Products(title, imageUrl, description, price); //create a new const based on Product class and req.body is often used in web applications to access data that has been sent to the server as part of an HTTP request.
  product.save(); //save(push) the objetc in the array
  res.redirect("/");
};
//middleware function of admin route :

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.editing; //have "true" id the query param exist
  if (!editMode) {
    console.log("this is an error in params ??");
    console.log(editMode);
    return res.redirect("/");
  }
  const prodId = req.params.productID; //to have the access to the productID
  Product.findById(prodId, (product) => {
    if (!prodId) {
      console.log("this is an error in the rendering ??");
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      titlePage: "Edit-product",
      path: "admins/edit-product",
      editing: editMode, //verifier si le produit exsist ??
    });
  });
};

//products middleware in admin route
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
