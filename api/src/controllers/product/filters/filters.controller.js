const { Products } = require("../../../db");
const { Op } = require("sequelize");

const filters = async (req, res) => {
  try {
    // Trae a los productos que coincidan con el nombre enviado por query
    let { category, price, status, order } = req.body;
    let allProducts = await Products.findAll();
    let productsFound = allProducts.map((product) => product.get());
    
    if (!order || order !== "D") {
      order = "A";
    }

    if (category) {
      productsFound = productsFound.filter(
        (element) => element.category === category
      );
      if (!productsFound.length) {
        return res
          .status(400)
          .send({ message: "There are no products with that category" });
      }
    }
    if (status) {
      productsFound = productsFound.filter(
        (element) => element.status === status
      );
      if (!productsFound.length) {
        return res
          .status(400)
          .send({ message: "There are no products with that status" });
      }
    }
    
    if (price){
      productsFound = productsFound.filter( element => element.price >=price.min && element.price <=price.max)
    }
    if (order === "A") {
      productsFound.sort((a, b) => {
        if (a.name > b.name) return 1;
        else return -1;
      });
    } else {
      productsFound.sort((a, b) => {
        if (a.name < b.name) return 1;
        else return -1;
      });
    }
    return res.status(200).json(productsFound);
  } catch (error) {
    return res.status(404).send({ message: error.message });
  }
};

module.exports = { filters };
