const { Pool } = require("pg");

function Query(req,res){

const pool = new Pool({
  user: 'diegospillo',
  host: 'dpg-ckvnb8i37rbc739en73g-a',
  database: 'pizzadb_tquo',
  password: 'v29fHJ386OPDLE4bcQLcqkjxBjBuUBt1',
  port: 5432,
});

pool.query("DELETE FROM Classi WHERE id > 36;", (err, result) => {
    if (err) {
      console.error(err);
    } else {
      res.send("Righe eliminate con successo!");
    }
  });

}

module.exports = Query;