//the basic system :
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.set('view engine', 'ejs');
app.set('views', 'views');
//path system :
const path = require('path');
const rootDir = require('./util/path.js');
//importing the routes :
const adminData = require('./routes/admin');//importing the admin-route 
app.use('/admin', adminData.routeDir);
const shopRoutes = require('./routes/shop.js');//importing the shop-route 
app.use(shopRoutes);


//parsing the incomming requests :
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//importion error controller file :
const errorController = require('./controllers/error');

app.use(errorController.get4O4);
app.listen(3000);
