const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
/*const crono = require('./crono_time');
crono.start();
*/
const PORT = process.env.PORT || 5000;

const Classi = require('./postgreSQL/query/Classi');
const Studenti = require('./postgreSQL/query/Studenti');
const Pizze = require('./postgreSQL/query/Pizze');
const Ordini = require('./postgreSQL/query/Ordini');

const request = require('./request_axios/request');

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors({origin: 'http://localhost:5173'||'https://pizzapp-28o9.onrender.com'}));
app.set('views', './views')
app.set('view engine', 'ejs')


app.get("/", (req,res)=>{
    const jsn = [
        {
            id: "25482396329555211",
            nome: "Diego",
            cognome: "Albani",
            id_classe: 1
        },
        {
            id: "10882347227455783",
            nome: "Francesco",
            cognome: "Belli",
            id_classe: 2
        }
    ];
    const nomiParametri = Object.getOwnPropertyNames(jsn[0]);
    res.render("workbranch", {tabella:"Home",data: jsn, paramaters: nomiParametri})
})
app.get("/Classi", async(req,res)=>{
    const id = req.query.id;
    const data_res = await request.get_classi(id);
    res.render("workbranch", {tabella:"Classi",data: await data_res.data, paramaters: data_res.parametri})
})
app.get("/Pizze", async(req,res)=>{
    const id = req.query.id;
    const data_res = await request.get_pizze(id);
    res.render("workbranch", {tabella:"Pizze",data: await data_res.data, paramaters: data_res.parametri})
})
app.get("/Studenti", async(req,res)=>{
    const id = req.query.id;
    const data_res = await request.get_studenti(id);
    res.render("workbranch", {tabella:"Studenti",data: await data_res.data, paramaters: data_res.parametri})
})
app.get("/Ordini", async(req,res)=>{
    const id = req.query.id;
    const data_res = await request.get_ordini(id);
    res.render("workbranch", {tabella:"Ordini",data: await data_res.data, paramaters: data_res.parametri})
})


////////////////////////////////////////////////// QUERY

app.get("/get_Classi", (req,res)=>Classi.get(req,res))//USE
app.get("/insert_Classi", (req,res)=>Classi.insert(req,res))
app.get("/drop_Classi", (req,res)=>Classi.drop(req,res))

app.get("/get_Studenti", (req,res)=>Studenti.get(req,res))
app.get("/check_id_Studenti", (req,res)=>Studenti.check_id(req,res))//USE
app.get("/create_Studenti", (req,res)=>Studenti.create(req,res))
app.get("/insert_Studenti", (req,res)=>Studenti.insert(req,res))//USE
app.get("/drop_Studenti", (req,res)=>Studenti.drop(req,res))
app.get("/alter_Studenti", (req,res)=>Studenti.alter(req,res))
app.get("/truncate_Studenti", (req,res)=>Studenti.truncate(req,res))
app.get("/get_Studente", (req,res)=>Studenti.get_studente(req,res))//USE

app.get("/get_Pizze", (req,res)=>Pizze.get(req,res))//USE
app.get("/insert_Pizze", (req,res)=>Pizze.insert(req,res))
app.get("/alter_Pizze", (req,res)=>Pizze.alter(req,res))
app.get("/drop_Pizze", (req,res)=>Pizze.drop(req,res))

app.get("/create_Ordini", (req,res)=>Ordini.create(req,res))
app.get("/get_Ordini", (req,res)=>Ordini.get_all(req,res))
app.get("/get_Ordini_Studente", (req,res)=>Ordini.get_ordini_studente(req,res))//USE
app.get("/get_Ordini_Classe", (req,res)=>Ordini.get_ordini_classe(req,res))//USE
app.get("/insert_Ordini", (req,res)=>Ordini.insert(req,res))//USE
app.get("/alter_Ordini", (req,res)=>Ordini.alter(req,res))
app.get("/drop_Ordine", (req,res)=>Ordini.drop(req,res))//USE
app.get("/truncate_Ordini", (req,res)=>Ordini.truncate(req,res))
app.get("/drop_table_Ordini", (req,res)=>Ordini.drop_table(req,res))


app.listen(PORT, () => {console.log("Server start on port " + PORT)})