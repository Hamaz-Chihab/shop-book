const Product = require("../modules/product"); //importing the class from module file
const User = require("../modules/user");
// exports.getCart = (req, res, next) => {
// Vérifiez si req.user est défini
// if (!req.user) {
//   return res.status(401).json({ message: "Unauthorized" });
// }

//   console.log("this is the req.user from get cart :", req.user);
//   Cart.findAll({ where: { userId: 1 } })
//     .then((carts) => {
//       const cart = carts[0];
//       cart
//         .getProducts()
//         .then((products) => {
//           res.render("shop/cart", {
//             titlePage: "shop-cart",
//             path: "/shop-cart", //the views file path
//             products: products,
//           });
//         })
//         .catch((err) =>
//           console.log("this is an error in getCart from shopController :", err)
//         );
//     })
//     .catch((err) =>
//       console.log("this is an error in getCart from shopController :", err)
//     );
// };

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId; //link between the view file and the midleware
  console.log("shopcontroller in the shop Controller  = ", req.user);
  Product.findById(prodId)
    .then((product) => {
      const shopUser = new User(
        req.user.userName,
        req.user.email,
        req.user._cart,
        req.user._id
      );
      console.log("shopUser = ", shopUser);
      return shopUser.addToCart(product);
    })
    .then((result) => {
      console.log("the rusult in the ", result);
    });
  // let fetchedCart;
  // req.user
  //   .getCart()
  //   .then((cart) => {
  //     fetchedCart = cart;
  //     return cart.getProducts({ where: { id: prodId } });
  //   })
  //   .then((products) => {
  //     let product;
  //     if (products.length > 0) {
  //       //extract the product obj from products array
  //       product = products[0];
  //     }
  //     let newQuantity;
  //     //if the product we extract exist
  //     if (product) {
  //       //get the old quantity and updated it
  //     }
  //     return Product.findByPk(prodId);
  //   })
  //   .then((product) => {
  //     return fetchedCart.addProduct(product, {
  //       through: { newQuantity: newQuantity },
  //     });
  //   })
  //   .catch((err) => console.log(err))
  //   .then(() => {
  //     res.redirect("/shop-cart");
  //   })

  //   .catch((err) => {
  //     console.log("this is an error in PostCart :", err);
  //   });
};

//checkout middleware in shop route
exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    titlePage: "shop-checkout",
    path: "/shop-checkout",
  });
};

//working with the MYSQL Data Base :
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
    }); //product here is a SQL module
  // Product.fetchAll()//product here is a JS module
  //   .then(([rows, fieldData]) => {
  //     console.log("this is the fielData", fieldData); //the colone properties of DB
  //     console.log("this is the Rows :", rows); //first row of the DB
  //     res.render("shop/index", {
  //       prods: rows,
  //       titlePage: "shop-index",
  //       path: "/shop-index",
  //     });
  //   })
  //   .catch((err) =>
  //     console.log("this is an error in the shop controller getIndex :/n", err)
  //   );
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
