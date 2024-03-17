const connection = require("../connectionDB");

function Create(req, res) {
  connection.connect(()=>{
    connection.query("CREATE TABLE `sessioni` (`id` int PRIMARY KEY AUTO_INCREMENT,`ip` varchar(20) NOT NULL,`inizio` timestamp NOT NULL DEFAULT current_timestamp(),`fine` timestamp NOT NULL DEFAULT current_timestamp(),`id_utente` int NOT NULL, FOREIGN KEY (id_utente) REFERENCES utenti(id))", ()=>{
      res.send("Tabella creata con successo!");
    });
  });
}

function Get(req, res) {
  connection.connect(()=>{
    connection.query("SELECT * FROM sessioni", (err,result)=>{
      res.send(result || []);
    });
  });
}

function Insert(req, res) {
  const sessione = {
    id: req.query.id,
    ip: req.query.ip,
    id_utente: req.query.id_utente,
  }
  connection.connect(()=>{
    connection.query("INSERT INTO sessioni (id,ip,id_utente,fine) VALUES (?,?,?,NULL)",
    [sessione.id,sessione.ip,sessione.id_utente],
    (err,result)=>{
      if (err) throw err;
      console.log("Nuova Sessione!");
      res.send(sessione.id);
    });
  });
}

function Update_end_date(req, res) {
  const sessione = {
    id: req.query.id,
  }
  connection.connect(()=>{
    connection.query("UPDATE sessioni SET fine = current_timestamp() WHERE id = ?",
    [sessione.id],
    (err,result)=>{
      if (err) throw err;
      res.send(sessione.id);
    });
  });
}

function Drop(req, res) {
  const id = req.query.id;
  connection.connect(()=> {
    connection.query("DELETE FROM sessioni WHERE id = ?",[id], function (err, result) {
      if (err) throw err;
      res.send("Dati eliminati con successo!");
    });
  });
}

module.exports = {
  create: Create,
  get: Get,
  insert: Insert,
  drop: Drop,
  update_end_date: Update_end_date 
};
