//create the web server
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
//tesy=ting code for connecting the data base :
// const db = require("./util/dataBase");
// db.execute("SELECT * FROM products")
//   .then((result) => {
//     console.log("this is the result :/n", result[0]);
//   })
//   .catch((err) => {
//     console.log(err);
//   });
const router = express.Router();

app.set("view engine", "ejs");
app.set("views", "views");
//path system :
const path = require("path");
const rootDir = require("./util/path.js");
//importing the routes :
const adminData = require("./routes/admin.js"); //importing the admin-route
app.use("/admin", adminData);
const shopRoutes = require("./routes/shop.js"); //importing the shop-route
app.use(shopRoutes);

//parsing the incomming requests :
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//importion error controller file :
// const errorController = require('./controllers/error.js');
// app.use(errorController.get404);
app.get("/", function (req, res, next) {
  res.status(404).render("error", { title: "error page" });
});

// app.listen(3000);
// module.exports = router;

//the project with the Data Base :

const sequelize = require("./util/dataBase");
const Product = require("./modules/product.js");
const User = require("./modules/user.js");

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" }); //the 'onDelete :'CASCADE''mean that if a User is deleted the product related to will also deleted
User.hasMany(Product);
sequelize //a table in DataBase will created according to the module file .(atable named Products "howa product bsh auto ydiro products")
  .sync({ force: true })
  .then((result) => {
    // console.log("this is the product result : ");
    app.listen(3000);
  })
  .catch((err) => {
    console.log("this is error from create DB Table : ", err);
  });
