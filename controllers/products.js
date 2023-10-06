//the logique  
const Products = require('../modules/product');//importing the class from module file
exports.postAddproduct = (req, res, next) => {
    const product = new product(req.body.titlePage);//create a new const based on Product class and req.body is often used in web applications to access data that has been sent to the server as part of an HTTP request. 
    product.save();//save(push) the objetc in the array
    res.redirect('/');
}

//middleware function of addproduct route :
exports.getAddproduct = (req, res, next) => {
    console.log('this is add-product midlleware');
    res.render('add-product', {
        titlePage: 'add-product',
        path: '/admin/add-product ',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    });
};

//middleware function of product route :
exports.getProduct = (req, res, next) => {
    Products.fetchAll(product => {
        res.render(
            'shop', {
            prods: product,//prods is used for shop-route and products is in the server 
            titlePage: 'shop',
            path: '/shop',
            hasProduct: product.length > 0,
            activeShop: true,
            productCSS: true
        });//rendering the shop template + Data object used in shop.pug});//to retrieve all the products in products-constant but the fetchll function does not return anny thing 'error'
    });
};
// exports.products = Products;