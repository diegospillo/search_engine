const axios = require('axios');

const url = "https://pizzappbackend.onrender.com";

async function getClassi() {
    const response = await axios.get(url+'/get_Classi');
    return response.data;
}

async function getPizze() {
    const response = await axios.get(url+'/get_Pizze');
    return response.data;
}

async function getStudenti() {
    const response = await axios.get(url+'/get_Studenti');
    return response.data;
}

async function getOrdini() {
    const response = await axios.get(url+'/get_Ordini');
    return response.data;
}

module.exports = {
    get_classi: getClassi,
    get_pizze: getPizze,
    get_studenti: getStudenti,
    get_ordini: getOrdini
}