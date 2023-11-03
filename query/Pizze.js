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
  }

function Get(req, res) {
  const pool = connection();

  pool.query("SELECT * FROM Pizze;", (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Dati letti con successo!");
      //console.log(result.rows);
      res.send(result.rows);
    }
  });
}

function Insert(req, res) {
  const pool = connection();

  pool.query(
    "INSERT INTO Studenti (Nome, prezzo) VALUES ('Margherita', 1), ('Boscaiola', 1.5);",
    (err, result) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Dati inseriti con successo!");
      }
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
        res.end("Dati cambiati con successo!");
      }
    }
  );
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
}

module.exports = {
  create: Create,
  alter: Alter,
  get: Get,
  insert: Insert,
  drop: Drop
};
