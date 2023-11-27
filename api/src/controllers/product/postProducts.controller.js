const { Products } = require("../../db");
const { Op } = require("sequelize");
const { arrayEquals } = require("../../utils/arrayEquals");
const {getUUID, isAuthorized} = require("../../utils/AuthUtils")

const postProducts = async (req, res) => {
  try {
    const product = req.body;

    const auth0User = await req.auth.payload.sub
        const rolesAllowed = ["Admin"]
        const userUUID = await getUUID(auth0User)
        
        if(!await isAuthorized(userUUID,rolesAllowed)){
            return res.status(403).json({error: `only ${rolesAllowed} allowed`})
        }

    let productsAtributes = Object.keys(Products.getAttributes());
    productsAtributes.shift()
    

    // Validacion para que tenga todos los atributos
    if (!arrayEquals(Object.keys(product), productsAtributes)) {
      return res.status(400).send({ message: "Atributes are missing" });
    }
    // Validacion para que no hayan espacios vacios o nulos
    for (let atribute in product) {
      if (!product[atribute]) {
        return res
          .status(422)
          .send({ message: "Empty attributes are not accepted" });
      }
    }

    // Si pasa todas las validaciones se crea el producto
    let [newProduct, created] = await Products.findOrCreate({
      where: { [Op.or]: [{ name: product.name.toLowerCase() }] },
      defaults: {
        name: product.name.toLowerCase(),
        description: product.description,
        category: product.category,
        price: product.price,
        stockNow: product.stockNow,
        brand: product.brand,
        image: product.image,
        status: product.status,
      },
    });
    if (!created) {
      return res.status(400).send({ message: "The product already exists" });
    }
    res.status(200).json(newProduct);
    return res;
  } catch (error) {
    res.status(404);
    res.send({ message: error.message });
  }
};

module.exports = { postProducts };