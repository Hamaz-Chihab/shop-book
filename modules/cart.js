const fs = require("fs");
const path = require("path");

const p = path.join(
  // join the given path segments into one path
  path.dirname(process.mainModule.Filename),
  "data",
  "cart.json"
); //the place we are going to stor the cart information

module.exports = class Cart {
  static addProduct(id, productPrice) {
    //fetch the privious cart :
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalDty: 0 }; //object with two properties("array of cart"s and "total quantitye"="number of items in the cart")
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
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice = productPrice;
    });
  }
};
