// api/yugiohcard/services/yugiohcard.js
const axios = require("axios");

module.exports = {
  fetchYugiohCards: async () => {
    try {
      const response = await axios.get(
        "https://db.ygoprodeck.com/api/v7/cardinfo.php"
      );
      const data = response.data;
      console.log(data);
      // Transforma los datos según la estructura del modelo

      return data;
    } catch (error) {
      console.error("Error al consumir la API externa:", error);
      throw new Error("Error al obtener datos de la API externa");
    }
  },
};
