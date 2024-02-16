const connection = require("../connectionDB");

function Create(req, res) {
  const pool = connection();

  pool.query("CREATE TABLE Classi (id SERIAL PRIMARY KEY, anno VARCHAR(5) NOT NULL, sezione VARCHAR(5) NOT NULL)", (err, result) => {
      if (err) {
        console.error(err);
      } else {
        res.send("Tabella creata con successo!");
        pool.end();
      }
    });
}

function Get(req, res) {
  const pool = connection();

  pool.query("SELECT * FROM Classi;", (err, result) => {
    if (err) {
      console.error(err);
      res.send([]);
    } else {
      console.log("Dati letti con successo!");
      //console.log(result.rows);
      res.send(result.rows);
    }
    pool.end();
  });
}

function Insert(req, res) {
  const pool = connection();
  const anno = req.query.anno;
  const sezione = req.query.sezione;
  pool.query(
    'INSERT INTO Classi (anno, sezione) VALUES ($1::text, $2::text);',
    [anno, sezione],
    (err, result) => {
      if (err) {
        console.error(err);
        res.send(false);
      } else {
        res.send(true);
      }
      pool.end();
    }
  );
}

function Drop(req, res) {
  const pool = connection();
  const id=req.query.id;
  pool.query('DELETE FROM Classi WHERE id = $1;', [id], (err, result) => {
    if (err) {
      console.error(err);
      res.send(false);
    } else {
      res.send(true);
    }
    pool.end();
  });
}

module.exports = {
  create: Create,
  get: Get,
  insert: Insert,
  drop: Drop
};
