const Products = require('../modules/product');//importing the class from module file
//middleware function of admin route :
exports.getAddproduct = (req, res, next) => {
    res.render('admin/add-product', {
        titlePage: 'add-product',
        path: '/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
};
//middleware function of admin route :
exports.postAddproduct = (req, res, next) => {
    const title = req.body.title; //the name attribut in the ejs file
    const imageUrl = req.body.imageUrl; //the name attribut in the ejs file
    const price = req.body.price; //the name attribut in the ejs file
    const description = req.body.description; //the name attribut in the ejs file
    const product = new Products(title , imageUrl ,description ,price );//create a new const based on Product class and req.body is often used in web applications to access data that has been sent to the server as part of an HTTP request. 
    product.save();//save(push) the objetc in the array
    res.redirect('/');
};


//products middleware in admin route 
exports.getProducts = (req, res, next)=> {
    Products.fetchAll(product => {
        res.render('admin/product', {//the ejs file to render it 
            prods: product,//prods is used for shop-route and products is in the server 
            titlePage: 'admin-product',
            path : '/admin/products'//the path of the porte opened 
        });
    });
};