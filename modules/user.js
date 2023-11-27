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
    console.log("this is the cart items : ", this);
    const cartProductIndex = this.cart.items.findIndex((cp) => {
      return cp.productId.toString() == product._id.toString(); //=== mean strict equality (value + type)   == mean equality in value
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      //the product Exesist in Cart => the index >= 0
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      //if product doesn't exist in cart => index < 0
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: newQuantity,
      });
    }
    const updatedCart = {
      items: updatedCartItems,
    };
    const db = getDb();
    return db.collection("users").updateOne(
      { _id: new ObjectId(this._id) }, //filter
      { $set: { cart: updatedCart } }
    );
  }
  getCart() {
    const db = getDb();
    const productIds = this.cart.items.map((i) => {
      return i.productId;
    });
    return db
      .collection("products")
      .find({
        _id: { $in: productIds },
      })
      .toArray()
      .then((products) => {
        return products.map((p) => {
          return {
            ...p,
            quantity: this.cart.items.find((i) => {
              return i.productId.toString() === p._id.toString();
            }),
          };
        });
      });
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
