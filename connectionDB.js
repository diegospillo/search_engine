const { Pool } = require("pg");

function connection() {
    const pool = new Pool({
      user: "diegospillo",
      host: "dpg-ckvnb8i37rbc739en73g-a",
      database: "pizzadb_tquo",
      password: "v29fHJ386OPDLE4bcQLcqkjxBjBuUBt1",
      port: 5432,
    });
    return pool;
  }

module.exports = connection;

/*pool.query("CREATE TABLE Classi (id SERIAL PRIMARY KEY, anno VARCHAR(1) NOT NULL, sezione VARCHAR(2) NOT NULL)", (err, result) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Tabella creata con successo!");
  }
});
*/
