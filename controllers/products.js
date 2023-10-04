const Products = require('../modules/product');
exports.postAddproduct = (req, res, next) => {
    const product = new product(req.body.titlePage)
    res.redirect('/');
}

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
exports.getProduct = (req, res, next) => {
    const products = Product.fetchAll();
    res.render('shop', {
        prods: products,//prods is used for shop-route and products is in the server 
        titlePage: 'shop',
        path: '/shop',
        hasProduct: products.length > 0,
        activeShop: true,
        productCSS: true
    });//rendering the shop template + Data object used in shop.pug
};
exports.products = Products;