const connection = require("../connectionDB");

function Create(req, res) {
    const pool = connection();
  
    pool.query("CREATE TABLE Pizze (id SERIAL PRIMARY KEY, Nome VARCHAR(20) NOT NULL, prezzo INTEGER NOT NULL)", (err, result) => {
        if (err) {
          console.error(err);
        } else {
          res.send("Tabella creata con successo!");
        }
      });
    pool.end();
  }

function Get(req, res) {
  const pool = connection();

  pool.query("SELECT * FROM Pizze;", (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Dati letti con successo!");
      //console.log(result.rows);
      res.setHeader('Content-Type', 'application/json');
      res.send(result.rows);
    }
  });
  pool.end();
}

function Insert(req, res) {
  const pool = connection();

  pool.query(
    "INSERT INTO Pizze (Nome, prezzo) VALUES ('Margherita', 1), ('Boscaiola', 1.5);",
    (err, result) => {
      if (err) {
        console.error(err);
      } else {
        res.send("Dati inseriti con successo!");
      }
    }
  );
  pool.end();
}

function Alter(req, res){
    const pool = connection();

  pool.query(
    "ALTER TABLE Pizze ALTER COLUMN prezzo TYPE numeric;",
    (err, result) => {
      if (err) {
        console.error(err);
      } else {
        res.end("Dati cambiati con successo!");
      }
    }
  );
  pool.end();
}

function Drop(req, res) {
  const pool = connection();

  pool.query("DELETE FROM Studenti WHERE id > 18;", (err, result) => {
    if (err) {
      console.error(err);
    } else {
      res.send("Righe eliminate con successo!");
    }
  });
  pool.end();
}

module.exports = {
  create: Create,
  alter: Alter,
  get: Get,
  insert: Insert,
  drop: Drop
};
