//the file system :
const fs = require('fs');
const path = require('path');
const products = [];
const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
); 
const getProductsFromFile = cb => {//pass the cb(callback) argument to have a return from fetchAll function 
    fs.readFile(p, (err, fileContent) => {
        if (err) {
           return  cb([]);
        }else {
            cb(JSON.parse(fileContent));//return parsed json data 
        }
    });
};

module.exports = class Product {//do not forget the capital letter 
    constructor(t) {//to have store the product in an array of products using the constractor and fetch it 
        this.title = t;//propertie of the class
    };
    //storing data in a files via the module 
    save() { //want to stor product in the products array 
        //to store the input or the error message in a file named 'data/product.json'
        let products = [];
        getProductsFromFile(products=>{
            products.push(this);
            fs.writefile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
        fs.readFile(p, (err, filecontent) => {});
    };
    //static :can call the method on the class and not for a external obj
    static fetchAll(cb) {
        getProductsFromFile(cb);
    }
     
};

