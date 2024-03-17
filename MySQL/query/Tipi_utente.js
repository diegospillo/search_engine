const connection = require("../connectionDB");

function Create(req, res) {
  connection.connect(()=>{
    connection.query("CREATE TABLE `tipi_utente` (`id` int PRIMARY KEY AUTO_INCREMENT,`tipo` varchar(30) NOT NULL)", (err)=>{
      res.send("Tabella creata con successo!");
    });
  });
}

function Get(req, res) {
  connection.connect(()=>{
    connection.query("SELECT * FROM tipi_utente", (err,result)=>{
      res.send(result || []);
    });
  });
}

function Insert(req, res) {
  const tipo = req.query.tipo;
  connection.connect(()=>{
    connection.query("INSERT INTO tipi_utente (tipo) VALUES (?)",[tipo], (err,result)=>{
      if (err) throw err;
      console.log("Dati inseriti con successo!");
      res.send(true);
    });
  });
}

function Drop(req, res) {
  const id = req.query.id;
  connection.connect(()=> {
    connection.query("DELETE FROM tipi_utente WHERE id = ?",[id], function (err, result) {
      if (err) throw err;
      res.send("Dati eliminati con successo!");
    });
  });
}

module.exports = {
  create: Create,
  get: Get,
  insert: Insert,
  drop: Drop
};
