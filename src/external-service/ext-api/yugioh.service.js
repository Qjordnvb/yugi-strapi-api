const { instanceYugiAxios } = require("../common/intanceAxios");

const getCards = async function () {
  try {
    const response = await instanceYugiAxios.get("");

    const data = response.data;
    console.log(response.data);
    return data;
  } catch (error) {
    error.message;
  }
};

module.exports = { getCards };
