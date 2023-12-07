/* eslint-disable no-unused-vars */
//create the web server
const path = require("path");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
// const User = require("./modules/user.js");
// const mongoConnect = require("./util/dataBase").mongoConnect;

const shopRoutes = require("./routes/shop.js"); //importing the shop-route
const adminData = require("./routes/admin.js"); //importing the admin-route

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", "views");

// app.use((req, res, next) => {
//   User.findById("6560dad20204ed9a2937e640")
//     .then((user) => {
//       req.user = new User(user.userName, user.email, user.cart, user._id);
//       // console.log("this is the user in app.js : ", user);
//       // console.log("this is the req.user in app.js :", req.user);
//       next();
//     })
//     .catch((err) => {
//       console.log("error in the app.js file : ", err);
//       res.status(500).send("Server error");
//     });
// });

app.use(shopRoutes);
app.use("/admin", adminData);

app.get("/", function (req, res, next) {
  res.status(404).render("error", { title: "error page" });
});

mongoose
  .connect(
    "mongodb+srv://chihabHMZ:helloworld@cluster0.8b2ll09.mongodb.net/shop?retryWrites=true&w=majority" //after mongodb.net/ <dbName>
  )
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
