const { Pool } = require("pg");

function connection() {
    const pool = new Pool({
      user: "spillo",
      host: "dpg-cn4sgj5jm4es73bqkaa0-a",
      database: "pizza_76wm",
      password: "vZ7ynfw2tOXLMH8EvynoncMltgcTbLA9z",
      port: 5432,
    });
    return pool;
  }

module.exports = connection;
