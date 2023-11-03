const connection = require('./connection');

function Create(req, res) {
  const pool = connection();

  pool.query("CREATE TABLE Studenti (id VARCHAR(100) PRIMARY KEY, Nome VARCHAR(20) NOT NULL, Cognome VARCHAR(20) NOT NULL, Email VARCHAR(50) NOT NULL, id_Classe INTEGER NOT NULL)", (err, result) => {
    if (err) {
      console.error(err);
    } else {
      res.send("Tabella creata con successo!");
    }
  });
}

module.exports = {
  create: Create
};
