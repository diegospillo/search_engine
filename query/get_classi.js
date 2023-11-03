const { Pool } = require("pg");

function Query(req,res){

const pool = new Pool({
  user: 'diegospillo',
  host: 'dpg-ckvnb8i37rbc739en73g-a',
  database: 'pizzadb_tquo',
  password: 'v29fHJ386OPDLE4bcQLcqkjxBjBuUBt1',
  port: 5432,
});

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

module.exports = Query;

