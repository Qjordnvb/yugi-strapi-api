const axios = require("axios");

const instanceYugiAxios = axios.create({
  baseURL: process.env.URL_YUGIOH,
});

module.exports = { instanceYugiAxios };
