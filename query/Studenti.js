const connection = require('./connection');

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
  
    pool.query("INSERT INTO Studenti (id, Nome, Cognome, Email, id_Classe) VALUES ('116506312363245768991', 'Diego', 'Albani', 'albani.diego@midossi.it', 16);", (err, result) => {
        if (err) {
          console.error(err);
        } else {
          console.log("Dati inseriti con successo!");
        }
      });
  }

module.exports = {
  create: Get,
  insert: Insert
};
