const Sequelize = require("sequelize"); //Create a constractor

const sequelize = new Sequelize("node_complete", "root", "helloworld", {
  dialect: "mysql",
  host: "localhost",
}); //create a new obj = a connection POOL
module.exports = sequelize;

// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "node_complete",
//   password: "helloworld",
// });

// module.exports = pool.promise();
