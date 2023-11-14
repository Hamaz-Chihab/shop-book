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
}
module.exports = Product;
