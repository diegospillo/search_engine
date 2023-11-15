const connection = require("../connectionDB");

function Create(req, res) {
  const pool = connection();

  pool.query(
    "CREATE TABLE Ordini (id SERIAL PRIMARY KEY, id_Studente VARCHAR(100) NOT NULL, id_Pizza INTEGER NOT NULL, data TIMESTAMP DEFAULT CURRENT_TIMESTAMP)",
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
    } else {
      console.log("Dati letti con successo!");
      res.send(result.rows);
      pool.end();
    }
  });
}

function Get_ordini_studente(req, res) {
  const pool = connection();
  const id = req.query.id;
  pool.query(
    `SELECT * FROM Ordini WHERE id_studente = '${id}';`,
    (err, result) => {
      if (err) {
        console.error(err);
        res.send([]);
      } else {
        const ordini = result.rows;
        const id_pizze = ordini.map((ordine) => ordine.id_pizza);
        pool.query(
          `SELECT * FROM Pizze WHERE id IN (${id_pizze});`,
          (err, result1) => {
            if (err) {
              console.error(err);
              res.send([]);
            } else {
              const pizze = result1.rows;
              const newOrders = ordini.map((order) => {
                const one_pizza = pizze.find(
                  (item) => item.id === order.id_pizza
                );
                return {
                  id: order.id,
                  nome: one_pizza.nome,
                  prezzo: one_pizza.prezzo,
                };
              });
              res.send(newOrders);

              pool.end();
            }
          }
        );
      }
    }
  );
}

function Get_ordini_classe(req, res) {
  const pool = connection();
  const id = req.query.id;
  pool.query(`SELECT * FROM Studenti WHERE id = '${id}';`, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      const studente = result.rows;
      const id_classe = studente.map((stud) => stud.id_classe);
      pool.query(`SELECT * FROM Studenti WHERE id_classe = ${id_classe}`,(err, result1) => {
          if (err) {
            console.error(err);
            res.send([]);
          } else {
            const studenti_classe = result1.rows;
            const id_studenti_classe = studenti_classe.map((studente) => {
              return "'" + studente.id + "'";
            });
            console.log("Dati letti con successo1!");
            pool.query(`SELECT * FROM Ordini WHERE id_studente IN (${id_studenti_classe})`,(err, result2) => {
                if (err) {
                  console.error(err);
                  res.send([]);
                } else {
                  const ordini_classe = result2.rows;
                  const id_pizze = ordini_classe.map(
                    (ordine) => ordine.id_pizza
                  );
                  pool.query(`SELECT * FROM Pizze WHERE id IN (${id_pizze});`,(err, result3) => {
                      if (err) {
                        console.error(err);
                        res.send([]);
                      } else {
                        const pizze = result3.rows;
                        const newOrders = ordini_classe.map((order) => {
                          const one_stud = studenti_classe.find(
                            (item) => item.id === order.id_studente
                          );
                          const one_pizza = pizze.find(
                            (item) => item.id === order.id_pizza
                          );
                          return {
                            id: order.id,
                            nome: one_stud.nome + " " + one_stud.cognome,
                            pizza: one_pizza.nome,
                            prezzo: one_pizza.prezzo,
                          };
                        });
                        res.send(newOrders);

                        pool.end();
                      }
                    }
                  );
                }
              }
            );
          }
        }
      );
    }
  });
}

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
      `INSERT INTO Ordini (id_Studente, id_Pizza) VALUES ('${id_studente}', ${id_pizza});`,
      (err, result) => {
        if (err) {
          console.error(err);
        }
      }
    );
  });
  res.redirect(`http://localhost:5173/ordine?id=${id_studente}&stato=true`);
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
  pool.query(`DELETE FROM Ordini WHERE id = ${id_ordine};`, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      res.redirect(`http://localhost:5173/ordine?id=${id_studente}&stato=true`);
      pool.end();
    }
  });
}

function Truncate(req, res) {
  const pool = connection();

  pool.query("TRUNCATE Ordini", (err, result) => {
    if (err) {
      console.error(err);
      res.send(false);
    } else {
      res.send(true);
    }
    pool.end();
  });
}

module.exports = {
  create: Create,
  alter: Alter,
  get_all: Get_All,
  get_ordini_studente: Get_ordini_studente,
  get_ordini_classe: Get_ordini_classe,
  insert: Insert,
  drop: Drop,
  truncate:Truncate
};
