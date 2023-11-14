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
