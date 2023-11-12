const express = require("express");
const cors = require('cors');
const PORT = process.env.PORT || 5000;

const Classi = require('./query/Classi');
const Studenti = require('./query/Studenti');
const Pizze = require('./query/Pizze');
const Ordini = require('./query/Ordini');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
}));




//INVIO ORDINE
app.get("/send_ordine", (req,res) => {
    const id = req.query.id;
    var cont = 0;
    var ordini = [];
    while(true){
        var ordine = req.query["ordine"+cont];
        if(ordine){
            ordini.push(ordine);
            cont++;
        }
        else break;
    }
    console.log(ordini);
    res.redirect(`http://localhost:5173/ordine?id=${id}&stato=true`)
})


//ELIMINA ORDINE STUDENTE
app.get("/elimina_ordine", (req,res) => {
   const id = req.query.id_client;
   console.log(req.query);
   res.redirect(`http://localhost:5173/ordine?id=${id}&stato=true`)
})

////////////////////////////////////////////////// QUERY DI CREAZIONE

app.get("/get_Classi", (req,res)=>Classi.get(req,res))//USE
app.get("/insert_Classi", (req,res)=>Classi.insert(req,res))
app.get("/drop_Classi", (req,res)=>Classi.drop(req,res))

app.get("/check_id_Studenti", (req,res)=>Studenti.check_id(req,res))//USE
app.get("/create_Studenti", (req,res)=>Studenti.create(req,res))
app.get("/get_Studenti", (req,res)=>Studenti.get(req,res))
app.get("/insert_Studenti", (req,res)=>Studenti.insert(req,res))//USE
app.get("/drop_Studenti", (req,res)=>Studenti.drop(req,res))
app.get("/alter_Studenti", (req,res)=>Studenti.alter(req,res))
app.get("/truncate_Studenti", (req,res)=>Studenti.truncate(req,res))
app.get("/get_Studente", (req,res)=>Studenti.get_studente(req,res))//USE

app.get("/get_Pizze", (req,res)=>Pizze.get(req,res))//USE
app.get("/insert_Pizze", (req,res)=>Pizze.insert(req,res))
app.get("/alter_Pizze", (req,res)=>Pizze.alter(req,res))

app.get("/get_all_Ordini", (req,res)=>Ordini.get_all(req,res))
app.get("/get_Ordini_Studente", (req,res)=>Ordini.get_ordini_studente(req,res))//USE
app.get("/get_Ordini_Classe", (req,res)=>Ordini.get_ordini_classe(req,res))//USE
app.get("/insert_Ordini", (req,res)=>Ordini.insert(req,res))//USE
app.get("/alter_Ordini", (req,res)=>Ordini.alter(req,res))


app.listen(PORT, () => {console.log("Server start on port " + PORT)})