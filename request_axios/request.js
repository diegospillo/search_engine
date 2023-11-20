const axios = require('axios');

const url = "https://pizzappbackend.onrender.com";

async function truncate_Ordini() {
    const response = await axios.get(url+'/truncate_Ordini');
    return await response.data;
}

async function getClassi(id) {
    const response = await axios.get(url+'/get_Classi');
    const data_res = filter(response,id);
    return data_res;
}

async function getPizze(id) {
    const response = await axios.get(url+'/get_Pizze');
    const data_res = filter(response,id);
    return data_res;
}

async function getStudenti(id) {
    const response = await axios.get(url+'/get_Studenti');
    const data_res = filter(response,id);
    return data_res;
}

async function getOrdini(id) {
    const response = await axios.get(url+'/get_Ordini');
    const data_res = filter(response,id);
    return data_res;
}

async function getAmministratori(id) {
    const response = await axios.get(url+'/get_Amministratori');
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
    get_classi: getClassi,
    get_pizze: getPizze,
    get_studenti: getStudenti,
    get_ordini: getOrdini,
    get_amministratori: getAmministratori,
    truncate_ordini: truncate_Ordini
}