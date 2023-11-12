//create the web server
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const sequelize = require("./util/dataBase");
const Product = require("./modules/product.js");
const User = require("./modules/user.js");
const Cart = require("./modules/cart.js");
const CartItem = require("./modules/cart_item.js");

app.use(bodyParser.urlencoded({ extended: false }));

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
  // This is just a placeholder. Replace it with your actual authentication logic.
  req.user = {
    id: 1,
    firstName: "chihab eddine",
    lastName: "Hamaz",
    email: "chihab19@gmail.com",
    password: "123",
  };
  next();
});

app.get("/", function (req, res, next) {
  res.status(404).render("error", { title: "error page" });
});

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" }); //a userId will add to product Table && the 'onDelete :'CASCADE''mean that if a User is deleted the product related to will also deleted
User.hasMany(Product);

User.hasOne(Cart);
// Cart.belongsTo(User); //UserId will added as an attribut to Cart module

//a cart can contain many product and product can be apart of many carts
Product.belongsToMany(Cart, { through: CartItem });
Cart.belongsToMany(Product, { through: CartItem });

// Ensuite, synchronisez vos modèles avec la base de données
// Synchronize your models with the database
sequelize
  .sync({ force: true }) //to make sure that all tables have recreated
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({
        firstName: "chihab eddine",
        lastName: "Hamaz",
        email: "chihab19@gmail.com",
        password: "123",
      });
    }
    // Return the existing user if the user exists already
    return user;
  })
  .then((user) => {
    return user.createCart();
    console.log("this is user", user);
  })
  .then((cart) => {
    console.log("this is cart : ", cart);
  })
  .catch((error) => {
    console.error("An error occurred:", error);
  });

// Start the server
app.listen(3000);
