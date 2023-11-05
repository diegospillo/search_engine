const connection = require("../connectionDB");

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
  const client = {
    id: req.query.id,
    nome: req.query.nome,
    cognome: req.query.cognome,
    email: req.query.email,
    classe: req.query.classe
}
  pool.query(
    `INSERT INTO Studenti (id, Nome, Cognome, Email, id_Classe) VALUES (${client.id}, ${client.nome}, ${client.cognome}, ${client.email}, ${client.classe});`,
    (err, result) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Dati inseriti con successo!");
        res.json({ stato: true })
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
  get: Get,
  insert: Insert,
  drop: Drop
};
