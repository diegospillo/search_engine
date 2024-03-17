const axios = require('axios');

const url = process.env.URL || "http://localhost:5000";


//  WEBAPP
async function get_tipi_utente() {
    const response = await axios.get(url+'/get_Tipi_utente');
    return response;
}

async function insert_new_sessione(id,ip,id_utente) {
    const response = await axios.get(url+`/insert_Sessioni?id=${id}&ip=${ip}&id_utente=${id_utente}`);
    return `(Session start) id: ${response.data} `;
}

async function update_end_sessione(id) {
    const response = await axios.get(url+`/update_endDate_Sessioni?id=${id}`);
    return `(Session end) id: ${response.data} `;
}

//FILTER

async function filter(windows,query) {
    var response = [];
    switch(parseInt(windows)){
        case 0: response = await axios.get(url+'/filter/0');
        break;
        case 1: response = await axios.get(url+`/filter/1?date=${query.date}`);
        break;
        case 2: response = await axios.get(url+'/filter/2');
        break;
        case 3: response = await axios.get(url+`/filter/3?username=${query.username}&inizio=${query.inizio}&fine=${query.fine}`);
        break;
        case 4: response = await axios.get(url+'/filter/4');
        break;
        case 5: response = await axios.get(url+`/filter/5?x_mesi=${query.x_mesi}`);
        break;
        case 6: response = await axios.get(url+'/filter/6');
        break;
    }
    return response;
}

module.exports = {
    get_tipi_utente: get_tipi_utente,
    insert_new_sessione: insert_new_sessione,
    update_end_sessione: update_end_sessione,
    filter:filter
}