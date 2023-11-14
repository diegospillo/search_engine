const axios = require('axios');

async function getClassi() {
    const response = await axios.get('/get_Classi');
    return response;
}

async function getPizze() {
    const response = await axios.get('/get_Pizze');
    return response;
}

async function getStudenti() {
    const response = await axios.get('/get_Studenti');
    return response;
}

async function getOrdini() {
    const response = await axios.get('/get_Ordini');
    return response;
}

module.exports = {
    get_classi: getClassi,
    get_pizze: getPizze,
    get_studenti: getStudenti,
    get_ordini: getOrdini
}