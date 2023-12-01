/* eslint-disable no-unused-vars */
const Product = require("../modules/product"); //importing the class from module file
exports.postOrder = (req, res, next) => {
  // let fetchedCart;
  req.user
    .addOrder()
    .then((result) => {
      res.redirect("/shop-orders");
    })
    .catch((err) => console.log(err));
};
exports.getOreder = (req, res, next) => {
  req.user.getOrders().then((orders) => {
    res.render("/orders.ejs", {
      titlePage: "shop-order",
      path: "/shop-orders",
      orders: orders,
    });
  });
};

exports.getCart = (req, res, next) => {
  req.user.getCart().then((products) => {
    res.render("shop/cart", {
      titlePage: "shop-cart",
      path: "/shop-cart", //the views file path
      products: products,
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId; //link between the view file and the midleware
  // console.log("shopcontroller in the shop Controller = ", req.user);
  Product.findById(prodId)
    .then((product) => {
      console.log("this is the product to ADD : ", product);
      return req.user.addToCart(product);
    })
    .then((result) => {
      console.log("cart display succefully");
      res.redirect("/shop-cart");
    })
    .catch((err) => console.log("this is an error in shop Controller :", err));
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    titlePage: "shop-checkout",
    path: "/shop-checkout",
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        titlePage: "shop-index",
        path: "/shop-index",
      });
    })
    .catch((err) => {
      console.log(
        "this is a probleme from the GETIndex in shop controller :",
        err
      );
    });
};
//orders middleware in shop route
exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    titlePage: "shop-orders",
    path: "/shop-orders",
  });
};
//the get Product using DB :
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  // console.log("this is the ID ", prodId);
  Product.findById(prodId) //this function use the where query module to return an array named products in (.then) of objects according to the ID
    .then((product) => {
      res.render("shop/product-detail.ejs", {
        product: product,
        titlePage: product.title,
        path: "/shop-product/:productId",
      });
    })
    .catch((err) => {
      console.log("this is an error from shop controller getProducts :", err);
    });
};
//working with MYSQL :
exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products, //prods is used for shop-route and products is in the server
        titlePage: "All-Products",
        path: "/shop-products",
      });
    })
    .catch((err) => {
      console.log(
        "this is a probleme from the GETProducts in shop controller :",
        err
      );
    });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .deleteItemFromCart(prodId)
    .then((result) => {
      console.log("product delete succefuly !!");
      res.redirect("/shop-cart");
    })
    .catch((err) => {
      console.log(err);
    });
};
