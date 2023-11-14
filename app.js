//create the web server
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
// const sequelize = require("./util/dataBase");
// const Product = require("./modules/product.js");
// const User = require("./modules/user.js");
// const Cart = require("./modules/cart.js");
// const CartItem = require("./modules/cart_item.js");
const mongoConnect = require("./util/dataBase").mongoConnect;
app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", "views");
//path system :
const path = require("path");
const rootDir = require("./util/path.js");
//importing the routes :
const adminData = require("./routes/admin.js"); //importing the admin-route
app.use("/admin", adminData);
// const shopRoutes = require("./routes/shop.js"); //importing the shop-route
// app.use(shopRoutes);
//parsing the incomming requests :
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  next();
});
app.get("/", function (req, res, next) {
  res.status(404).render("error", { title: "error page" });
});
mongoConnect(() => {
  app.listen(3000);
});
