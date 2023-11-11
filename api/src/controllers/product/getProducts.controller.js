const { Products } = require("../../db");
const { Op } = require("sequelize");

const getProducts = async (req, res) => {
  try {
    // Trae a los productos que coincidan con el nombre enviado por query
    const { name } = req.query;
    if (name) {
      const nameCleaned = name
        .replace(/[^a-zA-ZáéíóúÁÉÍÓÚ\s]/g, "")
        .replace(" ", "")
        .toLowerCase();
      
      const productsFound = await Products.findAll({
        where: {
          name: {
            [Op.like]: "%"+nameCleaned+"%",
          },
        },
      });
      if (!productsFound.length) {
        return res.status(400).send({ message: "Product not found" });
      }
      return res.status(200).json(productsFound);
    }

    const allProducts = await Products.findAll();
    return res.status(200).json(allProducts);
  } catch (error) {
    res.status(404);
    res.send({ message: error.message });
  }
};

module.exports = { getProducts };
