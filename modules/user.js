const mongodb = require("mongodb");
const getDb = require("../util/dataBase").getDb; //to get intract with the DB
const ObjectId = mongodb.ObjectId;
class User {
  constaructor(userName, email, cart, id) {
    this.userName = userName;
    this.email = email;
    this.cart = cart;
    this._id = id; //this is the  ID of cart related to the user to can refers the cart
  }
  save() {
    const db = getDb(); //get access to my DB by calling getDb
    let dbOp;
    if (this._id) {
      //we are in the updating mode :
      dbOp = db
        .collection("users")
        .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this }); //to overide the product find with the filter by 'this' object <<this = all attributs >>
      // .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: {title : this.title , price : this.price} });//to can update only Title and price
    } else {
      //we are in the inserting new product mode :
      dbOp = db.collection("users").insertOne(this);
    }
    return dbOp
      .then((result) => {
        console.log("this is the User you created :", result);
      })
      .catch((err) => {
        console.log(err);
      }); //to tell mongoDb in witch collection you want to insert something
  }

  static addToCart(product) {
    const updatedCart = {
      items: [{ productID: new ObjectId(product._id), quantity: 1 }],
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
        // console.log(user);
        return user;
      })
      .catch((err) => console.log("error in userfindById :", err));
  }
}
module.exports = User;
