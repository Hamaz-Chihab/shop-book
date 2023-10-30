const Product = require("../modules/product"); //importing the class from module file
const Cart = require("../modules/cart"); //importport the cart module
//cart middleware in shop route
exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (let product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id
        );
        console.log("this is the getCart :", cartProductData);
        console.log("this is the getCart :", cart.product);

        if (cartProductData) {
          cartProducts.push({ producData: product, qty: cartProductData.qty });
        }
      }
      res.render("shop/cart", {
        titlePage: "shop-cart",
        path: "/shop-cart", //the views file path
        products: cartProducts,
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  // console.log(req.body);
  const prodId = req.body.productId; //link between the view file and the midleware
  console.log(prodId);
  Product.findById(prodId, (product) => {
    // const product = products.findById(prodId);
    if (product !== undefined) {
      // console.log(product.price);
      Cart.addProduct(prodId, product.price); //here where chang from add to card to delete from cart
    } else {
      console.log("product is undefined 1");
    }
  });
  // console.log(prodId); //print the productID
  res.redirect("/shop-cart");
};

//delete from cart
// exports.postCart = (req, res, next) => {
//   console.log(req.body);
//   const prodId = req.body.productId; //link between the view file and the midleware
//   console.log(prodId);
//   Product.findById(prodId, (product) => {
//     // const product = products.findById(prodId);
//     if (product !== undefined) {
//       console.log(product.price);
//       Cart.deleteProduct(prodId, product.price); //here where chang from add to card to delete from cart
//     } else {
//       console.log("product is undefined 1");
//     }
//   });
//   // console.log(prodId); //print the productID
//   res.redirect("/shop-cart");
// };

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
