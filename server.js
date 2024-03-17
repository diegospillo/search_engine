const express = require("express");
const session = require('express-session')

const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

const Ricerche = require('./MySQL/query/Ricerche');
const Sessioni = require('./MySQL/query/Sessioni');
const Tipi_utente = require('./MySQL/query/Tipi_utente');
const Utenti = require('./MySQL/query/Utenti');
const Filter = require('./MySQL/query/Filter')

const request = require('./request_axios/request');
const request_webapp = require('./request_axios/request_webapp');

const app = express();


app.use(session({
    secret: 'my-secret',  // a secret string used to sign the session ID cookie
    resave: false,  // don't save session if unmodified
    saveUninitialized: false,  // don't create session until something stored
}))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.set('trust proxy', true)
app.set('views', './views')
app.set('view engine', 'ejs') 

app.get("/", (req,res)=>{
    res.redirect("/login")
}) 

app.get("/maxAge", (req,res)=>{
    req.session.expire-=1;
    const expire = req.session.expire.toString();
    res.send(expire);
}) 
 
app.get("/login", (req,res)=>{
    const my_state = req.session.state_login;
    switch (my_state){
        case "success": res.redirect("/home")
          break;
        default:
            req.session.state_login="default"
            res.render("autenticazione/login", {state: my_state})
    }
})

app.get("/logout", async(req,res)=>{
    const tipo_utente = req.session.tipo_utente;
    if(tipo_utente=="visualizzatore"){
        var my_session = await request_webapp.update_end_sessione(req.sessionID);
        console.log(my_session);
    }
    req.session.destroy((err) => {
        res.redirect("/login")
    })
})

app.get("/signup", async(req,res)=>{
    const data_res = await request_webapp.get_tipi_utente();
    res.render("autenticazione/signup",{tipi_utente: data_res.data})
})
 
app.get("/home", async(req,res)=>{
    const tipo_utente = req.session.tipo_utente;
    const id_utente = req.session.id_utente;
    const stato_sessione = req.session.state_session;
    const username = req.session.username;

    switch (tipo_utente){
        case "amministratore":
            var windows = req.query.windows;
            if(!windows)windows=0;
            const data_res = await request_webapp.filter(windows,req.query);
            res.render("home/amministratore",{utenti: data_res.data,username:username,window:windows,query:req.query});
            break;
        case "visualizzatore":
            if(stato_sessione=="start"){
                var new_session = await request_webapp.insert_new_sessione(req.sessionID,req.ip,id_utente);
                console.log(new_session);
                req.session.state_session="esecuzione";
            }
            res.render("home/visualizzatore",{id_sessione:req.sessionID,username:username}); 
            break;
        default:
            req.session.state_login = "false";
            res.redirect("/login")
    }
    
})


////////////////////////////////////////////////// BACKOFFICE


app.get("/Ricerche", async(req,res)=>{
    const id = req.query.id;
    const data_res = await request.get_ricerche(id);
    res.render("workbranch", {tabella:"Ricerche",data: await data_res.data, paramaters: data_res.parametri})
})
app.get("/Sessioni", async(req,res)=>{
    const id = req.query.id;
    const data_res = await request.get_sessioni(id); 
    res.render("workbranch", {tabella:"Sessioni",data: await data_res.data, paramaters: data_res.parametri})
})
app.get("/Tipi_utente", async(req,res)=>{
    const id = req.query.id; 
    const data_res = await request.get_tipi_utente(id);
    res.render("workbranch", {tabella:"Tipi_utente",data: await data_res.data, paramaters: data_res.parametri})
})
app.get("/Utenti", async(req,res)=>{
    const id = req.query.id;
    const data_res = await request.get_utenti(id);
    res.render("workbranch", {tabella:"Utenti",data: await data_res.data, paramaters: data_res.parametri})
})



////////////////////////////////////////////////// QUERY API

//DONE
app.get("/create_Ricerche", (req,res)=>Ricerche.create(req,res))
app.get("/get_Ricerche", (req,res)=>Ricerche.get(req,res))//USE
app.get("/insert_Ricerche", (req,res)=>Ricerche.insert(req,res))
app.get("/drop_Ricerche", (req,res)=>Ricerche.drop(req,res))

//DONE
app.get("/create_Sessioni", (req,res)=>Sessioni.create(req,res))
app.get("/get_Sessioni", (req,res)=>Sessioni.get(req,res))//USE
app.get("/insert_Sessioni", (req,res)=>Sessioni.insert(req,res))//USE
app.get("/drop_Sessioni", (req,res)=>Sessioni.drop(req,res))
app.get("/update_endDate_Sessioni", (req,res)=>Sessioni.update_end_date(req,res))//USE

//DONE
app.get("/create_Tipi_utente", (req,res)=>Tipi_utente.create(req,res))
app.get("/get_Tipi_utente", (req,res)=>Tipi_utente.get(req,res))//USE
app.get("/insert_Tipi_utente", (req,res)=>Tipi_utente.insert(req,res))
app.get("/drop_Tipi_utente", (req,res)=>Tipi_utente.drop(req,res))

//DONE
app.get("/create_Utenti", (req,res)=>Utenti.create(req,res))
app.get("/get_Utenti", (req,res)=>Utenti.get(req,res))//USE
app.get("/insert_Utenti", (req,res)=>Utenti.insert(req,res))//USE
app.get("/drop_Utenti", (req,res)=>Utenti.drop(req,res))//USE
app.get("/check_Utente", (req,res)=>Utenti.check(req,res))//USE
app.get("/set_Utenti_registered", (req,res)=>Utenti.set_registered(req,res))//USE

////////////////////////////////////////////////// FILTER QUERY API

app.get("/filter/:windows", (req,res)=>{ //USE
    const windows = req.params.windows;
    switch(parseInt(windows)){
        case 0: Filter.select_0(req,res);
        break;
        case 1: Filter.select_1(req,res);
        break;
        case 2: Filter.select_2(req,res);
        break;
        case 3: Filter.select_3(req,res);
        break;
        case 4: Filter.select_4(req,res);
        break;
        case 5: Filter.select_5(req,res);
        break;
        case 6: Filter.select_6(req,res);
        break;
        default: res.send("Not Found 404!")
    }
    
});
 

app.listen(PORT, () => {console.log("Server start on port " + PORT)})


/*
ADMIN
username: diegospillo
password: 1204
*/