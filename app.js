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

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user; //to have use it in PostAddProduct to link the product with the user(fetch the userId )
      console.log("hello world : ", user);
      next();
    })
    .catch((err) =>
      console.log("this s an error from a middelware in app.js", err)
    );
});

//importion error controller file :
// const errorController = require('./controllers/error.js');
// app.use(errorController.get404);
app.get("/", function (req, res, next) {
  res.status(404).render("error", { title: "error page" });
});

// app.listen(3000);
// module.exports = router;

//the project with the Data Base :
const Sequelize = require("sequelize");
const sequelize = require("./util/dataBase");
const Product = require("./modules/product.js");
const User = require("./modules/user.js");
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" }); //a userId will add to product Table && the 'onDelete :'CASCADE''mean that if a User is deleted the product related to will also deleted
User.hasMany(Product);
sequelize
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({
        id: 1,
        firstName: "chihab eddine",
        lastName: "Hamaz",
        email: "chihab19@gmail.com",
        password: "123",
      });
    }
    return user; // Renvoyez l'utilisateur existant si l'utilisateur existe déjà
  })
  .then((user) => {
    console.log("this is the damy user we created : ", user);
    app.listen(3000);
  })
  .catch((error) => {
    console.error("An error occurred:", error);
  });
