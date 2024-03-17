const axios = require('axios');

const url = process.env.URL || "http://localhost:5000";


//  BACKOFFICE
async function getRicerche(id) {
    const response = await axios.get(url+'/get_Ricerche');
    const data_res = filter(response,id);
    return data_res;
}

async function getSessioni(id) {
    const response = await axios.get(url+'/get_Sessioni');
    const data_res = filter(response,id);
    return data_res;
}

async function getTipi_Utente(id) {
    const response = await axios.get(url+'/get_Tipi_Utente');
    const data_res = filter(response,id);
    return data_res;
}

async function getUtenti(id) {
    const response = await axios.get(url+'/get_Utenti');
    const data_res = filter(response,id);
    return data_res;
}


function filter(response,id){
    let data_res = response.data;
    if(data_res.length>0){
    if(id){
        const data_filter = data_res.filter(res => res.id==id);
        data_res = data_filter;
    }
    const nomiParametri = Object.getOwnPropertyNames(data_res[0]);
    return {
        data: data_res,
        parametri: nomiParametri
    };
}
return [];
}

module.exports = {
    get_ricerche: getRicerche,
    get_sessioni: getSessioni,
    get_tipi_utente: getTipi_Utente,
    get_utenti: getUtenti,
}