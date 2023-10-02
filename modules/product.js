const products = [];

module.exports = class Product {//do not forget the capital letter 
    constractor(t) {
        this.title = t;
    }
    save() {
        products.push(this);
    }
    fetchaAll() {
        return this.product
    }
}