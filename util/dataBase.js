const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
let _db;
const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://chihabHMZ:helloworld@cluster0.8b2ll09.mongodb.net/?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("DB Connected !");
      _db = client.db(); //:sroring the connection in the DB
      callback();
    })
    .catch((err) => {
      console.log("connection ERROR : ", err);
      throw err;
    });
};

//return access to connection
const getDb = () => {
  if (_db) {
    return _db; //return DB instence we created in the connection in top
  }
  throw "NO DataBase Found !";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
