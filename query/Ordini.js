const connection = require("../connectionDB");

function Create(req, res) {
    const pool = connection();
  
    pool.query("CREATE TABLE Ordini (id SERIAL PRIMARY KEY, id_Studente VARCHAR(100) NOT NULL, id_Pizza INTEGER NOT NULL, data TIMESTAMP DEFAULT CURRENT_TIMESTAMP)", (err, result) => {
        if (err) {
          console.error(err);
        } else {
          res.send("Tabella creata con successo!");
        }
      });
  }

function Get_All(req, res) {
  const pool = connection();
  
  pool.query("SELECT * FROM Ordini;", (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Dati letti con successo!");
      //console.log(result.rows);
      res.send(result.rows);
    }
  });
}

function Get_ordini_studente(req, res) {
  const pool = connection();
  const id = req.query.id;
  pool.query(`SELECT * FROM Ordini WHERE id_studente = '${id}';`, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Dati letti con successo!");
      console.log(result.rows);
    }
  });
}

function Insert(req, res) {
  const pool = connection();

  pool.query(
    "INSERT INTO Ordini (id_Studente, id_Pizza) VALUES ('116506312363245768991', 1);",
    (err, result) => {
      if (err) {
        console.error(err);
      } else {
        res.send("Dati inseriti con successo!");
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
  get_all: Get_All,
  get_ordini_studente: Get_ordini_studente,
  insert: Insert,
  drop: Drop
};
