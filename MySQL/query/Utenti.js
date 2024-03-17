const {createHash} = require("crypto")

const connection = require("../connectionDB");

function Create(req, res) {
  connection.connect(()=>{
    connection.query("CREATE TABLE `utenti` (`id` int PRIMARY KEY AUTO_INCREMENT,`username` varchar(30) NOT NULL,`password` varchar(35) NOT NULL,`stato` varchar(10) NOT NULL,`tipo_utente` int NOT NULL, FOREIGN KEY (tipo_utente) REFERENCES tipi_utente(id))", ()=>{
      res.send("Tabella creata con successo!");
    });
  });
}

function Get(req, res) {
  connection.connect(()=>{
    connection.query("SELECT * FROM utenti", (err,result)=>{
      res.send(result || []);
    });
  });
}

function Insert(req, res) {
  const utente = {
    username: req.query.username,
    password: createHash("md5").update(req.query.password).digest("hex"),
    tipo_utente: req.query.tipo_utente,
  }
  connection.connect(()=>{
    connection.query("INSERT INTO utenti (username,password,tipo_utente,stato) VALUES (?,?,?,?)",
    [utente.username,utente.password,utente.tipo_utente,"attesa"],
    (err,result)=>{
      if (err) req.session.state_login = "already_registered";
      else req.session.state_login = "registered";
      res.redirect("/login");
    });
  });
}

function Set_registered(req, res) {
  const id = req.query.id;
  connection.connect(()=> {
    connection.query("UPDATE utenti SET stato = 'registrato' WHERE id = ?",[id], function (err, result) {
      if (err) throw err;
      res.redirect("/home");
    });
  });
}

function Drop(req, res) {
  const id = req.query.id;
  connection.connect(()=> {
    connection.query("DELETE FROM utenti WHERE id = ?",[id], function (err, result) {
      if (err) throw err;
      res.redirect("/home"); 
    });
  });
}

function Check(req, res) {
  const utente = {
    username: req.query.username,
    password: createHash("md5").update(req.query.password).digest("hex"),
  }
  connection.connect(()=>{
    connection.query("SELECT U.id as id, U.username as username, U.stato as stato ,T.tipo as tipo FROM utenti U JOIN tipi_utente T ON U.tipo_utente = T.id WHERE U.username = ? AND U.password = ?",[utente.username,utente.password], (err,result)=>{
      var data = result[0];
      switch (data?.stato){
        case "registrato":
          switch (data?.tipo){
            case "amministratore": 
              req.session.id_utente = data?.id;
              req.session.state_login = "success";
              req.session.tipo_utente = "amministratore";
              req.session.state_session = "start";
              req.session.username = data?.username;
              res.redirect("/home");
              break;
            case "visualizzatore":
              req.session.id_utente = data?.id;
              req.session.state_login = "success";
              req.session.tipo_utente = "visualizzatore";
              req.session.state_session = "start";
              req.session.username = data?.username;
              req.session.expire = 60;
              res.redirect("/home");
              break;
            default:
              req.session.state_login = "false";
              res.redirect("/login");
          }
          break;
        case "attesa":
          req.session.state_login = "attesa";
          res.redirect("/login");
          break;
        default:
          req.session.state_login = "false";
          res.redirect("/login");
      }
    });
  });
}

function Get_Attesa(req, res) {
  connection.connect(()=>{ 
    connection.query("SELECT U.id as id, U.username as username, T.tipo as tipo FROM utenti U JOIN tipi_utente T ON U.tipo_utente = T.id WHERE U.stato = 'attesa'", (err,result)=>{
      res.send(result || []); 
    });
  });
}

module.exports = {
  create: Create,
  get: Get,
  insert: Insert,
  drop: Drop,
  check: Check,
  attesa: Get_Attesa,
  set_registered: Set_registered
};
