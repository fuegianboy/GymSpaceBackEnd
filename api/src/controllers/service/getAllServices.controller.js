const { Services } = require("../../db");
const { Op } = require("sequelize");

const getAllServices = async (req, res) => {
  try {
    let {id} = req.params
    if (id) {
      const service = await Services.findAll({
        where: {
          id: {
            [Op.like]: id,
          },
        },
      });
      if (!service.length) {
        return res.status(400).send({ message: "Service not found" });
      }
      return res.status(200).json(service);
    }
    const services = await Services.findAll();
    return res.status(200).json(services);
  } catch (error) {
    return res.status(500).send({ message: "Error retrieving Service record", error: error.message });
  }
};

module.exports = getAllServices;
// //---------------------------------------------------//

// try {
//   const { name } = req.query;
//   if (name) {
//     const nameCleaned = name
//       .replace(/[^a-zA-ZáéíóúÁÉÍÓÚ\s]/g, "")
//       .replace(" ", "")
//       .toLowerCase();
    
//     const productsFound = await Products.findAll({
//       where: {
//         name: {
//           [Op.like]: "%"+nameCleaned+"%",
//         },
//       },
//     });
//     if (!productsFound.length) {
//       return res.status(400).send({ message: "Product not found" });
//     }
//     return res.status(200).json(productsFound);
//   }

//   const allProducts = await Products.findAll();
//   return res.status(200).json(allProducts);
