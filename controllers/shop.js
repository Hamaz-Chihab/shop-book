//the logique  
const Product = require('../modules/product');//importing the class from module file
//Product middleware of shop route :
exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/product-list', {//the ejs file to render it 
            prods: products,//prods is used for shop-route and products is in the server 
            titlePage: 'All-Products',
            path: '/shop-products',
        });//rendering the shop template + Data object used in shop.pug});//to retrieve all the products in products-constant but the fetchll function does not return anny thing 'error'
    });
};
exports.getProduct = (req, res, next)=>{
    const prodId = req.params.productId;//the productId is a quiry param in the shop-route 
    console.log(prodId);
    res.redirect('/');
};
//index middleware of shop route 
exports.getIndex=(req ,res ,next )=>{
    Product.fetchAll(product => {
        res.render('shop/index', {//the ejs file to render it 
            prods: product,//prods is used for shop-route and products is in the server 
            titlePage: 'shop-index',
            path: '/shop-index',
        });//rendering the shop template + Data object used in shop.pug});//to retrieve all the products in products-constant but the fetchll function does not return anny thing 'error'
    });  
};

//cart middleware in shop route 
exports.getCart=(req, res, next)=>{
    res.render('shop/cart', {
        titlePage:'shop-cart',
        path: '/shop-cart'//the views file path
    });
};
//checkout middleware in shop route 
exports.getCheckout =(req, res, next)=>{
    res.render('shop/checkout',{
        titlePage: 'shop-checkout',
        path: '/shop-checkout'
    });
};
//orders middleware in shop route 
exports.getOrders =(req, res, next)=>{
    res.render('shop/orders',{
        titlePage: 'shop-orders',
        path: '/shop-orders'
    });
};
// exports.products = Product;
