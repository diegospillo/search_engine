const connection = require("../connectionDB");

const url = "https://pizzapp-28o9.onrender.com";

function Create(req, res) {
    const pool = connection();
  
    pool.query("CREATE TABLE Pizze (id SERIAL PRIMARY KEY, Nome VARCHAR(20) NOT NULL, prezzo INTEGER NOT NULL)", (err, result) => {
        if (err) {
          console.error(err);
        } else {
          res.send("Tabella creata con successo!");
          pool.end();
        }
      });
  }

function Get(req, res) {
  const pool = connection();

  pool.query("SELECT * FROM Pizze;", (err, result) => {
    if (err) {
      console.error(err);
      res.send([]);
    } else {
      console.log("Dati letti con successo!");
      res.send(result.rows);
    }
    pool.end();
  });
}

function Insert(req, res) {
  const pool = connection();
  const id = req.query.id;
  const nome = req.query.nome;
  const prezzo = req.query.prezzo;
  const date = new Date();
  var data_oggi = date.getFullYear() + "-" + (date.getMonth()+ 1) + "-" + date.getDate();

  pool.query(
    `INSERT INTO Pizze (Nome, prezzo) VALUES ('${nome}', ${prezzo});`,
    (err, result) => {
      if (err) {
        console.error(err);
      }
      res.redirect(`${url}/amministratore?id=${id}&data=${data_oggi}`);
      pool.end();
    }
  );
}

function Alter(req, res){
    const pool = connection();

  pool.query(
    "ALTER TABLE Pizze ALTER COLUMN prezzo TYPE numeric;",
    (err, result) => {
      if (err) {
        console.error(err);
      } else {
        res.send("Dati cambiati con successo!");
        pool.end();
      }
    }
  );
}

function Drop(req, res) {
  const pool = connection();
  const id_studente = req.query.id_client;
  const id = req.query.id;
  const date = new Date();
  var data_oggi = date.getFullYear() + "-" + (date.getMonth()+ 1) + "-" + date.getDate();
  pool.query(`DELETE FROM Pizze WHERE id = ${id};`, (err, result) => {
    if (err) {
      console.error(err);
    }
    res.redirect(`${url}/amministratore?id=${id_studente}&data=${data_oggi}`);
    pool.end();
  });
}

module.exports = {
  create: Create,
  alter: Alter,
  get: Get,
  insert: Insert,
  drop: Drop
};
