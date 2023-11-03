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

  pool.query("SELECT * FROM Studenti;", (err, result) => {
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
    "INSERT INTO Studenti (id, Nome, Cognome, Email, id_Classe) VALUES ('116506312363245768991', 'Diego', 'Albani', 'albani.diego@midossi.it', 16);",
    (err, result) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Dati inseriti con successo!");
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
  get: Get,
  insert: Insert,
  drop: Drop
};
