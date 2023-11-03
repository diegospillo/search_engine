
const { Pool } = require("pg");

const pool = new Pool({
  user: 'diegospillo',
  host: 'dpg-ckvnb8i37rbc739en73g-a',
  database: 'pizzadb_tquo',
  password: 'v29fHJ386OPDLE4bcQLcqkjxBjBuUBt1',
  port: 5432,
});

/*pool.query("CREATE TABLE Classi (id SERIAL PRIMARY KEY, anno VARCHAR(1) NOT NULL, sezione VARCHAR(2) NOT NULL)", (err, result) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Tabella creata con successo!");
  }
});
*/
/*pool.query("INSERT INTO Classi (anno, sezione) VALUES ('1', 'A'), ('1', 'B'), ('1', 'C'), ('2', 'A'), ('2', 'B'), ('2', 'C'), ('3', 'A'), ('3', 'B'), ('3', 'C'), ('3', 'DE'),('4', 'A'), ('4', 'B'), ('4', 'C'), ('4', 'DE'), ('5', 'A'), ('5', 'B'), ('5', 'C'), ('5', 'DE');", (err, result) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Dati inseriti con successo!");
  }
});*/

/*pool.query("SELECT * FROM Classi;", (err, result) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Dati letti con successo!");
    console.log(result.rows);
  }
});
*/