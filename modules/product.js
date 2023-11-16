const mongodb = require("mongodb");
const getDb = require("../util/dataBase").getDb; //to get intract with the DB
class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }
  save() {
    const db = getDb(); //get access to my DB by calling getDb
    return db
      .collection("products")
      .insertOne(this)
      .then((result) => {
        console.log("this is the Product you created :", result);
      })
      .catch((err) => {
        console.log(err);
      }); //to tell mongoDb in witch collection you want to insert something
  }
  static fetchAll() {
    const db = getDb(); //get access to my DB by calling getDb
    return db
      .collection("products")
      .find() //return curser(pointeur)
      .toArray() //return an array of products finding with the methode Find
      .then((products) => {
        console.log("fetchAll exectuted succesfuly :", products);
        return products;
      })
      .catch((err) => {
        console.log("this is an error in fetchAll methode :", err);
      });
  }
  static findById(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(prodId) }) //the ID in mongoDb object is stored in a way named 'bson' witch is a javaScript object and to transform prodId we use :new mongodb.ObjectId(prodId)
      .next()
      .then((product) => {
        console.log("findById exectuted succesfuly :", product);
        return product;
      })
      .catch((err) => {
        console.log("this is an error in findById methode :", err);
      });
  }
}
module.exports = Product;
