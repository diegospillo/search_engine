const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 5000;

const Classi = require('./postgreSQL/query/Classi');
const Studenti = require('./postgreSQL/query/Studenti');
const Pizze = require('./postgreSQL/query/Pizze');
const Ordini = require('./postgreSQL/query/Ordini');

const request = require('./request_axios/request');

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors({origin: 'http://localhost:5173'}));
app.set('views', './views')
app.set('view engine', 'ejs')





app.get("/", (req,res)=>{
    const jsn = [
        {
            id: "25482396329555211",
            nome: "Diego",
            cognome: "Albani",
            classe: 1
        },
        {
            id: "10882347227455783",
            nome: "Francesco",
            cognome: "Belli",
            classe: 2
        }
    ];
    const nomiParametri = Object.getOwnPropertyNames(jsn[0]);
    res.render("workbranch", {tabella:"Home",data: jsn, paramaters: nomiParametri})
})
app.get("/Classi", async(req,res)=>{
    const data_res = await request.get_classi();
    const nomiParametri = Object.getOwnPropertyNames(data_res[0]);
    res.render("workbranch", {tabella:"Classi",data: data_res, paramaters: nomiParametri})
})
app.get("/Pizze", async(req,res)=>{
    const data_res = await request.get_pizze();
    const nomiParametri = Object.getOwnPropertyNames(data_res[0]);
    res.render("workbranch", {tabella:"Pizze",data: data_res, paramaters: nomiParametri})
})
app.get("/Studenti", async(req,res)=>{
    const data_res = await request.get_studenti();
    const nomiParametri = Object.getOwnPropertyNames(data_res[0]);
    res.render("workbranch", {tabella:"Studenti",data: data_res, paramaters: nomiParametri})
})
app.get("/Ordini", async(req,res)=>{
    const data_res = await request.get_ordini();
    const nomiParametri = Object.getOwnPropertyNames(data_res[0]);
    res.render("workbranch", {tabella:"Ordini",data: data_res, paramaters: nomiParametri})
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

app.get("/get_Ordini", (req,res)=>Ordini.get_all(req,res))
app.get("/get_Ordini_Studente", (req,res)=>Ordini.get_ordini_studente(req,res))//USE
app.get("/get_Ordini_Classe", (req,res)=>Ordini.get_ordini_classe(req,res))//USE
app.get("/insert_Ordini", (req,res)=>Ordini.insert(req,res))//USE
app.get("/alter_Ordini", (req,res)=>Ordini.alter(req,res))
app.get("/drop_Ordine", (req,res)=>Ordini.drop(req,res))//USE


app.listen(PORT, () => {console.log("Server start on port " + PORT)})