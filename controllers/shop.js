//the logique  
const Products = require('../modules/product');//importing the class from module file
//Product middleware of shop route :
exports.getProduct = (req, res, next) => {
    Products.fetchAll(product => {
        res.render('shop/product-list', {//the ejs file to render it 
            prods: product,//prods is used for shop-route and products is in the server 
            titlePage: 'shop-product',
            path: '/shop-product',
            hasProduct: product.length > 0,
            activeShop: true,
            productCSS: true
        });//rendering the shop template + Data object used in shop.pug});//to retrieve all the products in products-constant but the fetchll function does not return anny thing 'error'
    });
};
//index middleware of shop route 
exports.getIndex=(req ,res ,next )=>{
    Products.fetchAll(product => {
        res.render('shop/index', {//the ejs file to render it 
            prods: product,//prods is used for shop-route and products is in the server 
            titlePage: 'shop-index',
            path: '/shop-index',
            hasProduct: product.length > 0,
            activeShop: true,
            productCSS: true
        });//rendering the shop template + Data object used in shop.pug});//to retrieve all the products in products-constant but the fetchll function does not return anny thing 'error'
    });  
};

//cart middleware in shop route 
exports.getCart=(req, res, next)=>{
    res.render('shop/cart', {
        titlePage:'shop-cart',
        path: '/shop-cart'
    });
};
//checkout middleware in shop route 
exports.getCheckout =(req, res, next)=>{
    res.render('shop/checkout',{
        titlePage: 'checkout',
        path: 'shop/checkout'
    });
};
// exports.products = Products;
// exports.products = Products;
// exports.products = Products;
