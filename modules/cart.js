const { error, log } = require("console");
const fs = require("fs");
const path = require("path");
const { stringify } = require("querystring");
// join the given path segments into one path
// const p = path.join(path.dirname(process.mainModule.Filename),"data","cart.json");
const p = path.join(__dirname, "..", "data", "cart.json");
//the place we are going to stor the cart information

module.exports = class Cart {
  static addProduct(id, productPrice) {
    //the main function in cart modules accept two parametres
    //fetch the privious cart :
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 }; //object with two properties("array of cart"s and "total quantitye"="number of items in the cart")
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      //analyze the cart => find existing product
      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      ); //to search for a product with a specific id.
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      //add a new product / increase the quantity
      if (existingProduct) {
        // found in the cart
        updatedProduct = { ...existingProduct }; //a new object updatedProduct is created by using the spread ({...}) operator to make a "shallow copy" = 'a copy whose properties share the same references as those of the source object from which the copy was made' of the existingProduct object.
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      // cart.totalPrice = cart.totalPrice + productPrice;
      cart.totalPrice = parseFloat(cart.totalPrice) + parseFloat(productPrice);
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        console.log("this is a error in tht deleteProduct methode :", error);
        return; //do nothing
      }
      const updatedCart = JSON.parse(fileContent);
      // const  = { ...JSON.parse(fileContent) };
      console.log("this is the updatedProduct object : ", updatedCart);

      // const product = updatedCart.product.find((prod) => prod.id === id);
      const productInd1 = updatedCart.products.findIndex(
        (prod) => prod.id === id
      );
      const product = updatedCart.products[productInd1];
      console.log("this is the product object : ", product);
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(
        (prod) => prod.id !== id
      );
      updatedCart.totalPrice =
        updatedCart.totalPrice - productPrice * productQty;
      fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
        console.log("error in the daleteProduct in Cart module : ", err);
      });
      //   const cart = JSON.parse(fileContent);

      //   const updatedCart = cart;
      //   // console.log(updatedCart);//to verifier if the cart obj has been copied
      //   const productInd1 = updatedCart.products.findIndex(
      //     (prod) => prod.id === id
      //   );
      //   const product = updatedCart.products[productInd1];
      //   let productQty = product.qty;
      //   if (productQty === 1) {
      //     updatedCart.products = updatedCart.products.filter(
      //       (prod) => prod.id !== id
      //     ); //this line of code is creating a new array of products that does not include the product with the specified ID
      //   } else {
      //     productQty = productQty - 1;
      //     product.qty = productQty;
      //   }

      //   updatedCart.totalPrice = cart.totalPrice - productPrice;
      //   fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
      //     console.log(err);
      //   });
    });
  }
  static getCart(cb) {
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        console.log("there is en error in getCart in cart-module");
        cb(null);
      } else {
        cb(cart);
      }
    });
  }
};
