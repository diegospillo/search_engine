const connection = require('./connection');

function Get(req, res) {
  const pool = connection();

  pool.query("SELECT * FROM Classi;", (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Dati letti con successo!");
      //console.log(result.rows);
      res.send(result.rows);
    }
  });
}

function Drop(req, res) {
  const pool = connection();

  pool.query("DELETE FROM Classi WHERE id > 18;", (err, result) => {
    if (err) {
      console.error(err);
    } else {
      res.send("Righe eliminate con successo!");
    }
  });
}

module.exports = {
  get: Get,
  drop: Drop
};
