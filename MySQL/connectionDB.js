var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3307,
  password: "",
  database: "search_engine"
});

module.exports = connection;
