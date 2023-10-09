const Products = require('../modules/product');//importing the class from module file

//middleware function of admin route :
exports.postAddproduct = (req, res, next) => {
    const product = new Products(req.body.titlePage);//create a new const based on Product class and req.body is often used in web applications to access data that has been sent to the server as part of an HTTP request. 
    product.save();//save(push) the objetc in the array
    res.redirect('/');
}

//middleware function of admin route :
exports.getAddproduct = (req, res, next) => {
    res.render('admin/add-product', {
        titlePage: 'add-product',
        path: '/admin/add-product ',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
};
//products middleware in admin route 