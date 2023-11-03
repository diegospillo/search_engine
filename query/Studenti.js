const connection = require('./connection');

function Get(req, res) {
  const pool = connection();

  pool.query("CREATE TABLE Studenti (id VARCHAR(100) PRIMARY KEY, Nome VARCHAR(20) NOT NULL, Cognome VARCHAR(20) NOT NULL, Email VARCHAR(50) NOT NULL, id_Classe INTEGER NOT NULL)", (err, result) => {
    if (err) {
      console.error(err);
    } else {
      res.send("Tabella creata con successo!");
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
  create: Get
};
