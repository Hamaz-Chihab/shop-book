//the file system :
const fs = require("fs");
const path = require("path");
const products = [];
const p = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);
const getProductsFromFile = (cb) => {
  //pass the cb(callback) argument to have a return from fetchAll function
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent)); //return parsed json data
    }
  });
};

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
    //want to stor product in the products array
    //to store the input or the error message in a file named 'data/product.json'
    // let products = [];
    getProductsFromFile((products) => {
      if (this.id) {
        //to check if the id existed => product existed
        const existingProductIndex = products.findIndex(
          //to access to the product index in the array Products and edited
          (prod) => prod.id === this.id //replace the product id with the new one
        );
        const updatedProducts = [...products]; //create a nex products array
        updatedProducts[existingProductIndex] = this;
        //call to save the new array updatedProducts :
        fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(p, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }
  //static :can call the method on the class and not for a external obj
  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  //to get the /shop-product route (product-detail)
  static findById(id, cb) {
    //to filter the route by the ID of the product
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id); //to find the object-ID
      cb(product);
    });
  }
};
