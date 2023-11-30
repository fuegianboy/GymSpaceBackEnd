const { Op } = require("sequelize");
const { Products, UserProducts, UserServices, Services } = require("../../db");
const { getUUID } = require("../../utils/AuthUtils");
const getCart = async (req, res) => {
  try {
    const { id } = req.params;
    const userUUID = await getUUID(id);
    const productsCart = await UserProducts.findAll({
      where: {
        userID: userUUID,
        mp_status: "inCart",
      },
    });
    const servicesCart = await UserServices.findAll({
      where: {
        userID: userUUID,
        mp_status: "inCart",
      },
    });

    const productsCartResponse = [];

    for (const item of productsCart) {
      let product = await Products.findByPk(item.productID);
      if(product){
      product = product.toJSON();
      const transformedProduct = { ...product, quantity: item.qty };
      productsCartResponse.push(transformedProduct);
    }
    }

    const servicesCartResponse = [];

    
    for (const item of servicesCart) {
      let service = await Services.findByPk(item.serviceID);
      if(service){
      service = service.toJSON();
      const transformedService = {
        ...service,
        quantity: item.qty,
        startDate: item.startDate,
      };
      servicesCartResponse.push(transformedService);
      
    }
    }
    
    return res
      .status(200)
      .json({ products: productsCartResponse, services: servicesCartResponse });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error getting the cart", error: error.message });
  }
};

module.exports = getCart;
