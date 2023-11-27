/* eslint-disable no-unused-vars */
//create the web server
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const User = require("./modules/user.js");
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;

const shopRoutes = require("./routes/shop.js"); //importing the shop-route
const adminData = require("./routes/admin.js"); //importing the admin-route

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("6560dad20204ed9a2937e640")
    .then((user) => {
      // req.user = user; //user_pbject - User_Module_methods
      console.log("this is the user in app.js : ", user);
      req.user = new User(user.userName, user.email, user.cart, user, user._id); //user_pbject + User_Module_methods
      console.log("this is the req.user in app.js :", req.user);
      next();
    })
    .catch((err) => console.log("error in the app.js file : ", err));
});

app.use(shopRoutes);
app.use("/admin", adminData);

const mongoConnect = require("./util/dataBase").mongoConnect;

app.set("view engine", "ejs");
app.set("views", "views");
//path system :
const path = require("path");
const rootDir = require("./util/path.js");

app.get("/", function (req, res, next) {
  res.status(404).render("error", { title: "error page" });
});

mongoConnect(() => {
  app.listen(3000);
});
