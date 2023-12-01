/* eslint-disable no-unused-vars */
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
    console.log("this is the cart In AddToCart : ", this);
    console.log("HELLO WORLD from AddToCart : ", this.cart.items);
    const cartProductIndex = this.cart.items.findIndex((cp) => {
      return cp.productId.toString() == product._id.toString(); //=== mean strict equality (value + type)   == mean equality in value
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      //the product Exesist in Cart => the index >= 0
      newQuantity = this.cart[cartProductIndex].quantity + 1;
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
    this.cart.items = this.cart.items || [];
    console.log("HELLO WORLD After AddToCart :", this.cart.items);
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
          const item = this.cart.items.find((i) => {
            return i.productId.toString() === p._id.toString();
          });
          return {
            ...p,
            quantity: item ? item.quantity : 0,
          };
        });
      });
  }
  deleteItemFromCart(productId) {
    // const updatedCartItems = [...this.cart.items];
    // updatedCartItems.filter((item) => {
    //   return item.productId.toString() !== productId.toString();
    // });
    const updatedCartItems = this.cart.items.filter((item) => {
      return item.productId.toString() !== productId.toString();
    }); //this return the array  without the filtring acording to the condition
    const db = getDb();
    //storing In DB:
    return db
      .collection("users")
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: { items: updatedCartItems } } }
      );
  }
  getOrder() {
    const db = getDb();
    return db
      .collection("users")
      .insertOne(this.cart)
      .then((result) => {
        this.cart = { items: [] };
        return db
          .collection("user")
          .updateOne(
            { _id: new ObjectId(this._id) },
            { $set: { cart: { items: [] } } }
          );
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
