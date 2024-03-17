const axios = require("axios");
const jsdom = require("jsdom");
async function start() {
  const response = await axios.get(
    "https://www.google.com/search?q=cane"
  );
  const html = response.data;
  const dom = new jsdom.JSDOM(html);
  const element = dom.window.document.querySelector(
    "#rso > div:nth-child(2) > div > div > div > div.kb0PBd.cvP2Ce.jGGQ5e.ieodic > div > div > span > a > h3"
  );
  if (element) {
    console.log(element.textContent);
  }
}
start();
