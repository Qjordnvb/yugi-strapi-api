const { createCoreController } = require("@strapi/strapi").factories;
const yugiohcardService = require("../services/yugiohcard");

module.exports = createCoreController("api::yugiohcard.yugiohcard", ({}) => ({
  async find(ctx) {
    try {
      // Obtener los parámetros de paginación de la URL
      const { page = 1, limit = 10 } = ctx.query;

      // Realizar la solicitud al servicio externo
      const yugiohCards = await yugiohcardService.fetchYugiohCards();

      if (yugiohCards && yugiohCards.data) {
        // Transformar la respuesta para que coincida con el modelo de Strapi
        const transformedData = transformDataForStrapi(
          yugiohCards,
          page,
          limit
        );

        // Enviar la respuesta transformada
        return ctx.send({ data: transformedData });
      }

      // Resto del código...
    } catch (error) {
      console.error("Error fetching Yu-Gi-Oh! cards:", error);
      return ctx.send({ error: "Error fetching Yu-Gi-Oh! cards" }, 500);
    }
  },
}));

const transformDataForStrapi = (externalData, page, limit) => {
  if (!externalData || !externalData.data) {
    return null;
  }

  // Aplicar la paginación
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedData = externalData.data.slice(startIndex, endIndex);

  const transformedData = paginatedData.map((item) => {
    const transformedItem = {
      id: item.id,
      attributes: {
        name: item.name || "",
        type: item.type || "",
        frameType: item.frameType || "",
        desc: item.desc || "",
        race: item.race || "",
        archetype: item.archetype || "",

        card_images: (item.card_images || []).map((image) => ({
          id: image.id,
          image_url_small: image.image_url_small || "",
        })),
        card_prices: (item.card_prices || []).map((price) => ({
          cardmarket_price: price.cardmarket_price || "",
        })),
      },
    };

    return transformedItem;
  });

  return transformedData;
};
