var mysql = require('mysql');

/*var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3307,
  password: "",
  database: "search_engine"
});*/

var connection = mysql.createConnection({
  host: "mysql-37bb81e9-diego12juve-a331.a.aivencloud.com",
  user: "avnadmin",
  port: 14100,
  password: "AVNS_cuNTkN02zbl-L_f1u-A",
  database: "defaultdb",
  ssl: "REQUIRED"
});
connection.connect((err)=>{
  if (err) throw err;
  console.log("True")
})
//module.exports = connection;
