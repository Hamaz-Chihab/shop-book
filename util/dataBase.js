const mysql = require("mysql");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node_complete",
  password: "helloworld",
});
