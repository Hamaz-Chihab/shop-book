const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

const path = require('path');
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop.js');
const rootDir = require('./util/path.js');

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/admin', adminData.routes);
app.use(shopRoutes);
app.use(express.static(path.join(__dirname, 'public')));

const errorController = require('./controllers/error')
app.use(errorController.get4O4);

app.listen(3000);