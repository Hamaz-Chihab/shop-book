const mongodb = require("mongodb");
const getDb = require("../util/dataBase").getDb; //to get intract with the DB
const ObjectId = mongodb.ObjectId;
class User {
  constructor(userName, email, cart, _id) {
    this.userName = userName;
    this.email = email;
    this.cart = cart;
    this._id = _id;
  }
  save() {
    const db = getDb(); //get access to my DB by calling getDb
    return db.collection("users").insertOne(this);
  }

  addToCart(product) {
    const updatedCart = {
      items: [{ productId: new ObjectId(product._id), quantity: 1 }],
    };
    const db = getDb();
    return db.collection("users").updateOne(
      { _id: new ObjectId(this._id) }, //filter
      { $set: { cart: updatedCart } }
    );
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new ObjectId(userId) })
      .then((user) => {
        return user;
      })
      .catch((err) => console.log("error in userfindById :", err));
  }
}
module.exports = User;
