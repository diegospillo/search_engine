const cron = require("node-cron");
const request = require('./request_axios/request');

const job = cron.schedule("0 8 * * *", async() => {
  console.log("Esecuzione dell'attività alle 8:00 di mattina italiane");
  const stato = await request.truncate_ordini();
  console.log(await stato);
});

module.exports = job;