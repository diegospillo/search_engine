const connection = require("../connectionDB");

function Create(req, res){
  const pool = connection();

  pool.query("CREATE TABLE Studenti (id VARCHAR(100) PRIMARY KEY, nome VARCHAR(20) NOT NULL, cognome VARCHAR(20) NOT NULL, email VARCHAR(50) NOT NULL, id_classe integer NOT NULL)", (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Tabella creata con successo!");
      res.send("Tabella creata con successo!");
      pool.end();
    }
  });
}


function Get(req, res) {
  const pool = connection();
  pool.query("SELECT * FROM Studenti;", (err, result) => {
    if (err) {
      console.error(err);
      res.send([]);
    } else {
      console.log("Dati letti con successo!");
      res.send(result.rows);
    }
    pool.end();
  });
}

async function Insert(req, res) {
  const pool = connection();
  const client = {
    id: req.query.id,
    nome: req.query.nome,
    cognome: req.query.cognome,
    email: req.query.email,
    classe: req.query.classe
}
//PEPPE DEVE CAMBIA' COGNOME
const nome_client = client.nome.replace(/'/g, "''");
const cognome_client = client.cognome.replace(/'/g, "''");
const email_client = client.email.replace(/'/g, "''");

const query = `INSERT INTO Studenti (id, Nome, Cognome, Email, id_Classe) VALUES ('${client.id}', '${nome_client}', '${cognome_client}', '${email_client}', ${client.classe});`;
console.log(query); 
pool.query(query,(err, result) => {
      if (err) {
        console.error(err);
        res.json({ stato: false })
        pool.end();
      } else {
        console.log("Dati inseriti con successo!");
        res.json({ stato: true });
        pool.end();
      }
    }
  );
}

function Drop(req, res) {
  const pool = connection();

  pool.query("DROP TABLE Studenti", (err, result) => {
    if (err) {
      console.error(err);
    } else {
      res.send("Tabella eliminata con successo!");
      pool.end();
    }
  });
}

function Alter(req, res){
  const pool = connection();

pool.query(
  "ALTER TABLE Studenti ALTER COLUMN id TYPE varchar(50);",
  (err, result) => {
    if (err) {
      console.error(err);
    } else {
      res.send("Dati cambiati con successo!");
      pool.end();
    }
  }
);
}

function Truncate(req, res) {
  const pool = connection();

  pool.query("TRUNCATE Studenti", (err, result) => {
    if (err) {
      console.error(err);
    } else {
      res.send("Dati tabella eliminata con successo!");
      pool.end();
    }
  });
}

function Check_id(req, res){
  const pool = connection();
  const id = req.query.id;
  pool.query(`SELECT * FROM Studenti WHERE id = '${id}';`, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      if(result.rows.length>0){
        console.log("ID registrato");
        res.json({ stato: true });
      }
      else{
        console.log("ID non registrato");
        res.json({ stato: false })
      }
      pool.end();
      }
  });
}

function Get_Studente(req, res) {
  const pool = connection();
  const id = req.query.id;
  pool.query(`SELECT * FROM Studenti WHERE id = '${id}';`, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      const studente = result.rows;
      pool.query(`SELECT * FROM Classi WHERE id = ${studente[0].id_classe};`, (err, result1) => {
        if (err) {
          console.error(err);
        } else {
          const classe = result1.rows;
          const new_studente = studente.map((studente1, index) => {
            return {
              id: studente1.id,
              nome: studente1.nome,
              cognome: studente1.cognome,
              email: studente1.email,
              classe: classe[index].anno + classe[index].sezione
            };
          });
          res.send(new_studente);
          pool.end();
        }
      });
    }
  });
}

module.exports = {
  create: Create,
  get: Get,
  alter: Alter,
  insert: Insert,
  drop: Drop,
  truncate: Truncate,
  check_id: Check_id,
  get_studente: Get_Studente
};
