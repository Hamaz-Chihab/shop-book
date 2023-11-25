const mongodb = require("mongodb");
const getDb = require("../util/dataBase").getDb; //to get intract with the DB
class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new object.ObjectId(id) : null;
    this.userId = userId;
  }
  save() {
    const db = getDb(); //get access to my DB by calling getDb
    return db.collection("products").insertOne(this); //to tell mongoDb in witch collection you want to insert something
  }
  static fetchAll() {
    const db = getDb(); //get access to my DB by calling getDb
    return db
      .collection("products")
      .find() //return curser(pointeur)
      .toArray() //return an array of products finding with the methode Find
      .then((products) => {
        console.log("fetchAll exectuted succesfuly");
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
        console.log("findById exectuted succesfuly ");
        return product;
      })
      .catch((err) => {
        console.log("this is an error in findById methode :", err);
      });
  }
  static DeleteById(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(prodId) })
      .then(() => {
        console.log(console.log("product deleted succesfuly"));
      })
      .catch((err) => console.log("this is error in deleteById", err));
  }
}
module.exports = Product;
