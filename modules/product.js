const mongodb = require("mongodb");
const getDb = require("../util/dataBase").getDb; //to get intract with the DB
class Product {
  constructor(title, price, description, imageUrl, id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id;
  }
  save() {
    const db = getDb(); //get access to my DB by calling getDb
    let dbOp;
    if (this._id) {
      //we are in the updating mode :
      dbOp = db
        .collection("products")
        .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this }); //to overide the product find with the filter by 'this' object <<this = all attributs >>
      // .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: {title : this.title , price : this.price} });//to can update only Title and price
    } else {
      //we are in the inserting new product mode :
      dbOp = db.collection("products").insertOne(this);
    }
    return dbOp
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
