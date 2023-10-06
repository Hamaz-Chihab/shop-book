//the file system :
const fs = require('fs');
const path = require('path');

const products = [];//the array that contain the product-object 'input'

module.exports = class Product {//do not forget the capital letter 
    constructor(t) {//to have store the product in an array of products using the constractor and fetch it 
        this.title = t;//propertie of the class
    };
    //storing data in a files via the module 
    save() { //want to stor product in the products array 
        //to store the input or the error message in a file named 'data/product.json'
        const p = path.join(path.dirname(process.mainModule.filename), 'data', 'product.json');//STORING THE PATH in condt named p 
        fs.readFile(p, (err, filecontent) => {
            let products = [];
            if (!err) {
                products = JSON.parse(filecontent);
            }
            products.push(this);
            fs.writefile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    };
    //static :can call the method on the class and not for a external obj
    static fetchAll(cb) {//pass the cb(callback) argument to have a return from fetchAll function 
        fs.readFile(p, (err, filecontent) => {
            if (err) {
                cb([]);
            }
            cb(JSON.parse(filecontent));//return parsed json data 
        });
    }
};

