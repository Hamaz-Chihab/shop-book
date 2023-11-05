// //the file system :
// const fs = require("fs");
// const path = require("path");
// const products = [];
// const cart = require("./cart"); //extrqct the cart  object to use delete-methode
// const p = path.join(
//   path.dirname(require.main.filename),
//   "data",
//   "products.json"
// );
// const getProductsFromFile = (cb) => {
//   //pass the cb(callback) argument to have a return from fetchAll function
//   fs.readFile(p, (err, fileContent) => {
//     if (err) {
//       cb([]);
//     } else {
//       cb(JSON.parse(fileContent)); //return parsed json data
//     }
//   });
// };

// module.exports = class Product {
//   //do not forget the capital letter
//   constructor(id, title, imageUrl, description, price) {
//     //to have store the product in an array of products using the constractor and fetch it
//     this.id = id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }

//   //storing data in a files via the module
//   save() {
//     //want to stor product in the products array
//     //to store the input or the error message in a file named 'data/product.json'
//     // let products = [];
//     getProductsFromFile((products) => {
//       if (this.id) {
//         //to check if the id existed => product existed
//         const existingProductIndex = products.findIndex(
//           //to access to the product index in the array Products and edited
//           (prod) => prod.id === this.id //replace the product id with the new one
//         );
//         const updatedProducts = [...products]; //create a nex products array
//         updatedProducts[existingProductIndex] = this;
//         //call to save the new array updatedProducts :
//         fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
//           console.log(err);
//         });
//       } else {
//         this.id = Math.trunc(Math.random() * 100).toString();
//         products.push(this);
//         fs.writeFile(p, JSON.stringify(products), (err) => {
//           console.log(err);
//         });
//       }
//     });
//   }

//   //  deleting data in a files via the module

//   static deleteById(id) {
//     getProductsFromFile((products) => {
//       const product = products.find((prod) => prod.id === id); //extract the product object from the array to have access to the price
//       console.log("inter the deleteById succesfully", product);
//       const updatedProducts = products.filter((prod) => prod.id !== id); //This line creates a new array, updatedProducts, which contains all products from the original list except for the one with the ID specified.
//       console.log("inter the deleteById succesfully", updatedProducts);
//       fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
//         if (!err) {
//           cart.deleteProduct(id, product.price);
//         }
//       });
//     });
//   }

//   //static :can call the method on the class and not for a external obj
//   static fetchAll(cb) {
//     getProductsFromFile(cb);
//   }

//   //to get the /shop-product route (product-detail)
//   static findById(id, cb) {
//     //to filter the route by the ID of the product
//     getProductsFromFile((products) => {
//       const product = products.find((p) => p.id === id); //to find the object-ID
//       cb(product);
//     });
//   }
// };

// this version working with MYSQL BATABASE :
const db = require("../util/dataBase");
const cart = require("./cart"); //extrqct the cart  object to use delete-methode
module.exports = class Product {
  //do not forget the capital letter
  constructor(id, title, imageUrl, description, price) {
    //to have store the product in an array of products using the constractor and fetch it
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  //storing data in a files via the module
  save() {
    return db.execute(
      "INSERT INTO products (title ,price ,description ,imageUrl) VALUES(?,?,?,?)",
      [this.title, this.price, this.description, this.imageUrl]
    );
  }

  //  deleting data in a files via the module

  static deleteById(id) {}

  //static :can call the method on the class and not for a external obj
  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  //to get the /shop-product route (product-detail)
  static findById() {
    return db.execute("SELECT * FROM products WHERE products.id = ?", [id]); //the ? is like the /n referes to [id]
  }
};
