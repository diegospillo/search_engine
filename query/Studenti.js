const connection = require("../connectionDB");

function Create(req, res){
  const pool = connection();

  pool.query("CREATE TABLE Studenti (id integer PRIMARY KEY, nome VARCHAR(20) NOT NULL, cognome VARCHAR(20) NOT NULL, email VARCHAR(20) NOT NULL, id_classe integer NOT NULL)", (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Tabella creata con successo!");
      res.send("Tabella creata con successo!");
    }
  });
}


function Get(req, res) {
  const pool = connection();
  
  pool.query("SELECT * FROM Studenti;", (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Dati letti con successo!");
      //console.log(result.rows);
      res.send(result.rows);
    }
  });
}

function Insert(req, res) {
  const pool = connection();
  const client = {
    id: req.query.id,
    nome: req.query.nome,
    cognome: req.query.cognome,
    email: req.query.email,
    classe: req.query.classe
}
  if(Exist(pool,client.id)==false){
  pool.query(
    `INSERT INTO Studenti (id, Nome, Cognome, Email, id_Classe) VALUES (${client.id}, '${client.nome}', '${client.cognome}', '${client.email}', ${client.classe});`,
    (err, result) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Dati inseriti con successo!");
        res.json({ stato: true })
      }
    }
  );
  }
  else{
    res.json({ stato: false })
  }
}

function Drop(req, res) {
  const pool = connection();

  pool.query("DROP TABLE Studenti", (err, result) => {
    if (err) {
      console.error(err);
    } else {
      res.send("Tabella eliminata con successo!");
    }
  });
}

async function Exist(pool,id){
  async function isIdPresent(id) {
    const results = await pool.query(`SELECT COUNT(*) AS num_rows FROM Studenti WHERE id = ${id}`);
    return results.rows[0].num_rows === 1;
  }
  
  const isPresent = await isIdPresent(id);
  console.log(isPresent);
  return isPresent;
}

function Alter(req, res){
  const pool = connection();

pool.query(
  "ALTER TABLE Studenti ALTER COLUMN id TYPE integer;",
  (err, result) => {
    if (err) {
      console.error(err);
    } else {
      res.send("Dati cambiati con successo!");
    }
  }
);
}

module.exports = {
  create: Create,
  get: Get,
  alter: Alter,
  insert: Insert,
  drop: Drop
};
