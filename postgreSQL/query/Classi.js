const connection = require("../connectionDB");

function Get(req, res) {
  const pool = connection();

  pool.query("SELECT * FROM Classi;", (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Dati letti con successo!");
      //console.log(result.rows);
      res.send(result.rows);
      pool.end();
    }
  });
}

function Insert(req, res) {
  const pool = connection();

  pool.query(
    "INSERT INTO Classi (anno, sezione) VALUES ('1', 'A'), ('1', 'B'), ('1', 'C'), ('2', 'A'), ('2', 'B'), ('2', 'C'), ('3', 'A'), ('3', 'B'), ('3', 'C'), ('3', 'DE'),('4', 'A'), ('4', 'B'), ('4', 'C'), ('4', 'DE'), ('5', 'A'), ('5', 'B'), ('5', 'C'), ('5', 'DE');",
    (err, result) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Dati inseriti con successo!");
        pool.end();
      }
    }
  );
}

function Drop(req, res) {
  const pool = connection();

  pool.query("DELETE FROM Classi WHERE id > 18;", (err, result) => {
    if (err) {
      console.error(err);
    } else {
      res.send("Righe eliminate con successo!");
      pool.end();
    }
  });
}

module.exports = {
  get: Get,
  insert: Insert,
  drop: Drop
};
