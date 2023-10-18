const Product = require("../modules/product"); //importing the class from module file

//cart middleware in shop route
exports.getCart = (req, res, next) => {
  res.render("shop/cart", {
    titlePage: "shop-cart",
    path: "/shop-cart", //the views file path
  });
};

exports.postCart= (req,res,next )=>{
const prodId = req.body.productId;//link between the view file and the midleware 
 console.log(prodId);
 res.redirect('/shop-cart');

};
//checkout middleware in shop route
exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    titlePage: "shop-checkout",
    path: "/shop-checkout",
  });
};

//index middleware of shop route
exports.getIndex = (req, res, next) => {
  Product.fetchAll((product) => {
    res.render("shop/index", {
      //the ejs file to render it
      prods: product, //prods is used for shop-route and products is in the server
      titlePage: "shop-index",
      path: "/shop-index",
    }); //rendering the shop template + Data object used in shop.pug});//to retrieve all the products in products-constant but the fetchll function does not return anny thing 'error'
  });
};

//orders middleware in shop route
exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    titlePage: "shop-orders",
    path: "/shop-orders",
  });
};

//product detail middleware in shop route
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId; //the productId is a quiry param in the shop-route
  Product.findById(prodId, (product) => {
    //methode to
    // console.log(product);
    res.render("shop/product-detail.ejs", {
      product: product,
      titlePage: product.title,
      path: "/shop-products",
    });
  });
  //   console.log(prodId);
};

//Products middleware of shop route :
exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("shop/product-list", {
      //the ejs file to render it
      prods: products, //prods is used for shop-route and products is in the server
      titlePage: "All-Products",
      path: "/shop-products",
    }); //rendering the shop template + Data object used in shop.pug});//to retrieve all the products in products-constant but the fetchll function does not return anny thing 'error'
  });
};

// exports.products = Product;
