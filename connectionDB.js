const { Client } = require('pg')
const client = new Client({
  user: 'diegospillo',
  host: 'dpg-ckvnb8i37rbc739en73g-a',
  database: 'pizzadb_tquo',
  password: 'v29fHJ386OPDLE4bcQLcqkjxBjBuUBt1',
  port: 5432,
})
client.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});