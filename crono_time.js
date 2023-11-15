const cron = require("node-cron");
const request = require('./request_axios/request');

const job = cron.schedule("36 19 * * *", async() => {
  console.log("Esecuzione dell'attività alle 8:00 di mattina italiane");
  const stato = await request.truncate_ordini();
  console.log(stato);
});

module.exports = job;