const connection = require("../connectionDB");

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
    } else {
      console.log("Dati letti con successo!");
      res.send(result.rows);
      pool.end();
    }
  });
}

function Insert(req, res) {
  const pool = connection();
  const nome = req.query.nome;
  const prezzo = req.query.prezzo;
  pool.query(
    `INSERT INTO Pizze (Nome, prezzo) VALUES ('${nome}', ${prezzo});`,
    (err, result) => {
      if (err) {
        console.error(err);
        res.send(false);
      } else {
        res.send(true);
      }
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
  const id = req.query.id;
  pool.query(`DELETE FROM Pizze WHERE id = ${id};`, (err, result) => {
    if (err) {
      console.error(err);
      res.send(false);
    } else {
      res.send(true);
    }
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
