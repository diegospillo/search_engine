const express = require("express");
const cors = require('cors');

const Classi = require('./query/Classi');
const Studenti = require('./query/Studenti');
const Pizze = require('./query/Pizze');
const Ordini = require('./query/Ordini');

const app = express();

app.use(cors({
    origin: 'http://localhost:5173'
}));

//AUTORIZZAZIONE LOGIN
app.get("/login", (req,res) => {
    const id = req.query.id;
    console.log(id);
    res.json({ stato: true })
})

//REGISTRAZIONE
app.get("/signUp", (req,res) => {
    const client = {
        id: req.query.id,
        nome: req.query.nome,
        cognome: req.query.cognome,
        classe: req.query.classe
    }
    console.log(client);
    res.json({ stato: true })
})

//GET LISTA PIZZE && ORDINI STUDENTE
app.get("/ordine", (req,res) => {
    const id = req.query.id;
    const client = {
        "id": "116506312363245768991",
        "nome": "Diego Albani",
        "classe": "IV B"
    }
    const Lista_Pizze = [
    {
        "id": 1,
        "nome": "Margherita",
        "prezzo": 2
    }, {
        "id": 2,
        "nome": "Cotto",
        "prezzo": 1
    }, {
        "id": 3,
        "nome": "Boscaiola",
        "prezzo": 5
    }, {
        "id": 4, 
        "nome": "Bianca",
        "prezzo": 1
    }, {
        "id": 5,
        "nome": "Rossa",
        "prezzo": 1.50
    }, {
        "id": 6,
        "nome": "Verde",
        "prezzo": 1.50
    }, {
        "id": 7,
        "nome": "Nera",
        "prezzo": 1.50
    }, {
        "id": 8,
        "nome": "Aranancia",
        "prezzo": 1.50
    }]
    const Ordini_client = [
        {
            "id": 1,
            "nome": "Margherita",
            "prezzo": 2
        },
        {
            "id": 2,
            "nome": "Boscaiola",
            "prezzo": 2
        }
    ]

    const Data = {
        "client": client,
        "pizze": Lista_Pizze,
        "ordini": Ordini_client
    }

    console.log(id);
    res.json(Data);
})

//INVIO ORDINE
app.get("/send_ordine", (req,res) => {
    const id = req.query.id;
    const ordine = req.query;
    console.log(ordine);
    res.redirect(`http://localhost:5173/ordine?id=${id}&stato=true`)
})

//GET LISTA ORDINI CLASSE
app.get("/amministratore", (req,res) => {
    const client = {
        "id": "116506312363245768991",
        "nome": "Diego Albani",
        "classe": "IV B"
    }

    const ordini = [
      {
        "nome": "Diego",
        "pizza": "Margherita",
        "prezzo": 1.50
      },
      {
        "nome": "Luca",
        "pizza": "Rossa",
        "prezzo": 2
      },
      {
        "nome": "Diego",
        "pizza": "Boscaiola",
        "prezzo": 1
      },
      {
        "nome": "Marco",
        "pizza": "Rossa",
        "prezzo": 4
      },
      {
        "nome": "Luca",
        "pizza": "Bianca",
        "prezzo": 1
      },
    ]
    
    const Data = {
        "client": client,
        "ordini": ordini
    }
    const id = req.query.id;
    console.log(id);
    res.json(Data);
})

//GET LISTA ORDINI CLASSE
app.get("/classi", (req,res) => {
    const Data = [
      {
        "id": 1,
        "classe": "III B"
      },
      {
        "id": 2,
        "classe": "IV A"
      }
    ]
    res.json(Data);
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
app.get("/get_Ordini_Studente", (req,res)=>Ordini.get_ordini_studente(req,res))
app.get("/insert_Ordini", (req,res)=>Ordini.insert(req,res))
app.get("/alter_Ordini", (req,res)=>Ordini.alter(req,res))

app.listen(5000, () => {console.log("Server start on port 5000")})