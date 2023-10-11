//create the web server 
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));


const router = express.Router();



app.set('view engine', 'ejs');
app.set('views', 'views');
//path system :
const path = require('path');
const rootDir = require('./util/path.js');
//importing the routes :
const adminData = require('./routes/admin.js');//importing the admin-route 
app.use('/admin', adminData);
const shopRoutes = require('./routes/shop.js');//importing the shop-route 
app.use(shopRoutes);


//parsing the incomming requests :
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//importion error controller file :
// const errorController = require('./controllers/error.js');
// app.use(errorController.get404);
app.get('/', function(req, res, next) {
    res.status(404).render('error', { title: 'error page' });
  });

app.listen(3000);
module.exports = router;

