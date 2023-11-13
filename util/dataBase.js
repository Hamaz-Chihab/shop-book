const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const mongoConnect = (callback) => {
  MongoClient.connect(
    "mongodb+srv://Chihabhmz:lhech123@cluster0.wl9lsed.mongodb.net/?retryWrites=true&w=majority"
  )
    .then((client) => {
      console.log("DB Connected !");
      callback(client);
    })
    .catch((err) => {
      console.log("connection ERROR : ", err);
    });
};

module.exports = mongoConnect;
