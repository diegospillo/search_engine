const connection = require("../connectionDB");

function Create(req, res) {
  connection.connect(()=>{
    connection.query("CREATE TABLE `ricerche` (`id` int PRIMARY KEY AUTO_INCREMENT,`nome_ricerca` varchar(30) NOT NULL,`data_ora` timestamp NOT NULL DEFAULT current_timestamp(),`id_sessione` int NOT NULL,FOREIGN KEY (id_sessione) REFERENCES sessioni(id))", ()=>{
      res.send("Tabella creata con successo!");
    });
  });
}

function Get(req, res) {
  connection.connect(()=>{
    connection.query("SELECT * FROM ricerche", (err,result)=>{ 
      res.send(result || []);
    });
  });
}

function Insert(req, res) {
  const ricerca = {
    nome_ricerca: req.query.nome_ricerca,
    id_sessione: req.query.id_sessione,
  }
  connection.connect(()=>{
    connection.query("INSERT INTO ricerche (nome_ricerca,id_sessione) VALUES (?,?)",
    [ricerca.nome_ricerca,ricerca.id_sessione],
    (err,result)=>{
      if (err) throw err;
      console.log("Ricerca Efettuata!");
      res.redirect("/home");
    });
  });
}

function Drop(req, res) {
  const id = req.query.id;
  connection.connect(()=> {
    connection.query("DELETE FROM ricerche WHERE id = ?",[id], function (err, result) {
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
