const { Op } = require("sequelize");
const { Users } = require("../../db");
const { UserProducts, UserServices } = require("../../db");
const { getUUID } = require("../../utils/AuthUtils");
const updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = req.body;
    console.log(data)
    const { products } = data;
    const {services} = data
    const userUUID = await getUUID(id);

    // Delete products 
    const productsCart = await UserProducts.findAll({
      where: {
        userID: userUUID,
        mp_status: "inCart",
      },
    });
    if (productsCart.length) {
      productsCart.map((product) => {
        product.destroy();
      });
    }
    // Delete services
    const servicesCart = await UserServices.findAll({
        where: {
          userID: userUUID,
          mp_status: "inCart",
        },
      });
      if (servicesCart.length) {
        servicesCart.map((service) => {
          service.destroy();
        });
      }
    if(products.length){
    for (const product of products) {
        const productToCart = {
          userID: userUUID,
          productID: product.productID,
          qty: product.quantity,
          unitPrice: product.price,
          date: Date.now(),
          mp_status: "inCart",
        };
        await UserProducts.create(productToCart);
      }
    }
    if(services.length){
      for (const service of services) {
        const serviceToCart = {
          userID: userUUID,
          serviceID: service.serviceID,
          startDate:service.startDate,
          finishDate:Date.now(),
          startTime:service.startDate,
          days_notice:2,
          qty: service.quantity,
          unitPrice: service.price,
          date: Date.now(),
          status: 'normal',
          mp_status: "inCart",
        };
        await UserServices.create(serviceToCart);
      }
    }
    return res.status(200).json({ message: "Your cart was updated" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error updating the cart", error: error.message });
  }
};

module.exports = updateCart;
