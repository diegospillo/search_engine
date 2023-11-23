const connection = require("../connectionDB");

const url = "https://pizzapp-28o9.onrender.com";

function Create(req, res) {
  const pool = connection();

  pool.query(
    "CREATE TABLE Ordini (id SERIAL PRIMARY KEY, id_Studente VARCHAR(100) NOT NULL, id_Pizza INTEGER NOT NULL, data DATE DEFAULT CURRENT_DATE)",
    (err, result) => {
      if (err) {
        console.error(err);
      } else {
        res.send("Tabella creata con successo!");
        pool.end();
      }
    }
  );
}

function Get_All(req, res) {
  const pool = connection();

  pool.query("SELECT * FROM Ordini;", (err, result) => {
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

function Get_ordini_studente(req, res) {
  const pool = connection();
  const id = req.query.id;
  pool.query(
    "SELECT Ordini.id, Pizze.nome, Pizze.prezzo FROM Ordini JOIN Pizze ON Ordini.id_pizza = Pizze.id WHERE Ordini.id_studente = $1::text AND Ordini.data = CURRENT_DATE;",
    [id],
    (err, result) => {
      if (err) {
        console.error(err);
        res.send([]);
      } else {
        const ordini = result.rows;
        res.send(ordini);
        pool.end();
      }
    }
  );
}


// RICORDA SQL INJECTION
function Get_ordini_classe(req, res) {
  const pool = connection();
  const id = req.query.id;
  pool.query(
    "SELECT * FROM Studenti WHERE id = $1::text;",
    [id],
    (err, result1) => {
      if (err) {
        console.error(err);
        res.send([]);
        pool.end();
      } else {
        const id_classe = result1.rows.id_classe;
  pool.query("SELECT Ordini.id, Studenti.nome, Studenti.cognome, Pizze.nome AS pizza, Pizze.prezzo, Studenti.id_classe FROM (Studenti JOIN Ordini ON Ordini.id_studente = Studenti.id) JOIN Pizze ON Pizze.id = Ordini.id_pizza WHERE Studenti.id_classe = $1;",
  [id_classe], (err, result) => {
    if (err) {
      console.error(err);
      res.send([]);
    } else if (result.rows == 0) {
      console.error("Studente inesistente.");
      res.send([]);
    } else {
      const ordini = result.rows;
      const newOrders = ordini.map((order) => {
        return {
          id: order.id,
          nome: order.nome + " " + order.cognome,
          pizza: order.pizza,
          prezzo: order.prezzo
        };
      });
      res.send(newOrders);
      pool.end();
    }
  });
};
});
}

//Amministratore

function Get_ordini_classi(req, res) {
  const pool = connection();
  const data = req.query.data; 
  pool.query(
    "SELECT Ordini.id, Classi.anno, Classi.sezione, Pizze.nome, Pizze.prezzo FROM Ordini INNER JOIN Studenti ON Ordini.id_studente = Studenti.id JOIN Classi ON Studenti.id_classe = Classi.id JOIN Pizze ON Ordini.id_pizza = Pizze.id WHERE Ordini.data=$1::text;",
    [data],
    (err, result) => {
      if (err) {
        console.error(err);
        res.send([]);
      } else {
        const Ordini=result.rows;
        const newOrders = Ordini.map((order) => {
          return {
            id: order.id,
            nome: order.anno + "" + order.sezione,
            pizza: order.nome,
            prezzo: order.prezzo
          };
        });
        res.send(newOrders);
      }
      pool.end();
    }
  );
}

///

function Insert(req, res) {
  const pool = connection();
  const id_studente = req.query.id;
  var cont = 0;
  var id_pizze = [];
  while (true) {
    let id_pizza_ord = req.query["ordine" + cont];
    if (id_pizza_ord) {
      id_pizze.push(id_pizza_ord);
      cont++;
    } else break;
  }
  id_pizze.forEach((id_pizza) => {
    pool.query(
      "INSERT INTO Ordini (id_Studente, id_Pizza) VALUES ($1::text, $2::text);",
      [id_studente, id_pizza],
      (err, result) => {
        if (err) {
          console.error(err);
        }
      }
    );
  });
  res.redirect(`${url}/ordine?id=${id_studente}&stato=true`);
  pool.end();
}

function Alter(req, res) {
  const pool = connection();

  pool.query(
    "ALTER TABLE Pizze ALTER COLUMN prezzo TYPE numeric;",
    (err, result) => {
      if (err) {
        console.error(err);
      } else {
        res.end("Dati cambiati con successo!");
        pool.end();
      }
    }
  );
}

function Drop(req, res) {
  const pool = connection();
  const id_studente = req.query.id_client;
  const id_ordine = req.query.id_ordine;
  pool.query("DELETE FROM Ordini WHERE id = $1;", [id_ordine], (err, result) => {
    if (err) {
      console.error(err);
    }
      res.redirect(`${url}/ordine?id=${id_studente}&stato=true`);
      pool.end();
  });
}

function Truncate(req, res) {
  const pool = connection();

  pool.query("TRUNCATE Ordini", (err, result) => {
    if (err) {
      console.error(err);
      res.send(false);
    } else {
      console.log("Dati tabella eliminata con successo!");
      res.send(true);
    }
    pool.end();
  });
}

function Drop_table(req, res) {
  const pool = connection();

  pool.query("DROP TABLE Ordini", (err, result) => {
    if (err) {
      console.error(err);
    } else {
      res.send("Tabella eliminata con successo!");
      pool.end();
    }
  });
}

module.exports = {
  create: Create,
  alter: Alter,
  get_all: Get_All,
  get_ordini_studente: Get_ordini_studente,
  get_ordini_classe: Get_ordini_classe,
  get_ordini_all_classi:Get_ordini_classi,
  insert: Insert,
  drop: Drop,
  drop_table: Drop_table,
  truncate: Truncate,
};
