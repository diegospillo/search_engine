const connection = require("../connectionDB");

function Select_0(req, res) {
    connection.connect(()=>{ 
      connection.query("SELECT U.id as id, U.username as username, T.tipo as tipo FROM utenti U JOIN tipi_utente T ON U.tipo_utente = T.id WHERE U.stato = 'attesa'", (err,result)=>{
        res.send(result || []); 
      });
  });
}

function Select_1(req, res) {
  var date = req.query.date;
  date = date.replace('/','-');
  connection.connect(()=>{ 
    connection.query("SELECT U.username,DATE(R.data_ora) AS data_ricerca FROM (utenti U JOIN sessioni S ON U.id = S.id_utente) JOIN ricerche R ON R.id_sessione = S.id WHERE DATE(R.data_ora) = ? GROUP BY U.id,U.username",
    [date],
     (err,result)=>{
      res.send(result || []); 
    });
});
}

function Select_2(req, res) {
  connection.connect(()=>{ 
    connection.query("SELECT U.username,S.ip FROM utenti U JOIN sessioni S ON U.id = S.id_utente GROUP BY S.ip,U.username", (err,result)=>{
      if(result){
        var new_result =  raggruppaIpPerUsername(result)
      }
      res.send(new_result || []); 
    });
});
}

function Select_3(req, res) {
  const username = req.query.username;
  var inizio = req.query.inizio;
  inizio = inizio.replace('/','-');
  var fine = req.query.fine;
  fine = fine.replace('/','-');
  connection.connect(()=>{ 
    connection.query("SELECT R.nome_ricerca,DATE(R.data_ora) as data FROM (utenti U JOIN sessioni S ON U.id = S.id_utente) JOIN ricerche R ON R.id_sessione = S.id WHERE (U.username=?) AND (DATE(R.data_ora) BETWEEN ? AND ?)",
    [username,inizio,fine],
    (err,result)=>{
      res.send(result || []); 
    });
});
}

function Select_4(req, res) {
  connection.connect(()=>{ 
    connection.query("SELECT nome_ricerca, COUNT(*) as cont FROM ricerche GROUP BY nome_ricerca ORDER BY cont LIMIT 100", (err,result)=>{
      res.send(result || []); 
    });
});
}

function Select_5(req, res) {
  const x_mesi = req.query.x_mesi;
  connection.connect(()=>{ 
    connection.query("SELECT nome_ricerca, COUNT(*) as cont FROM ricerche WHERE DATE(ricerche.data_ora) BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL ? MONTH) AND CURRENT_DATE() GROUP BY nome_ricerca HAVING COUNT(*)>5 ORDER BY cont DESC",
    [x_mesi],
    (err,result)=>{
      res.send(result || []); 
    });
});
}

function Select_6(req, res) {
  connection.connect(()=>{ 
    connection.query("SELECT U.username,COUNT(*) as cont FROM (utenti U JOIN sessioni S ON U.id=S.id_utente) JOIN ricerche R ON S.id=R.id_sessione GROUP BY S.id,U.id,U.username ORDER BY cont DESC LIMIT 1", (err,result)=>{
      res.send(result || []); 
    });
});
}

function raggruppaIpPerUsername(utenti) {
  const mappaUtenti = {};

for (const utente of utenti) {
  const { username, ip } = utente;
  if (!mappaUtenti[username]) {
    mappaUtenti[username] = { username, ip: [] };
  }
  var my_ip=ip;
  if(my_ip.includes("::1")) my_ip = ip.replace("::1","127.0.0.1");
  else if(my_ip.includes("::ffff:")) my_ip = ip.replace("::ffff:","");
  mappaUtenti[username].ip.push(my_ip);
}
const utentiUniqi = Object.values(mappaUtenti)
return utentiUniqi;
}


module.exports = {
    select_0: Select_0,
    select_1: Select_1,
    select_2: Select_2,
    select_3: Select_3,
    select_4: Select_4,
    select_5: Select_5,
    select_6: Select_6,
};