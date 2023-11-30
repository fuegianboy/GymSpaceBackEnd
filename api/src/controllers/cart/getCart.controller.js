const { Op } = require("sequelize");
const { Products, UserProducts } = require("../../db");
const { getUUID } = require("../../utils/AuthUtils");
const getCart = async (req, res) => {
  try {
    const { id } = req.params;
    const userUUID = await getUUID(id);
    const userCart = await UserProducts.findAll({
      where: {
        userID: userUUID,
        mp_status: "inCart",
      },
    });

    const userCartResponse = [];

    for (const item of userCart) {
      let product = await Products.findByPk(item.productID);
      product = product.toJSON();
      const transformedProduct = { ...product, quantity: item.qty };
      userCartResponse.push(transformedProduct);
    }
    console.log(userCartResponse);
    return res.status(200).json(userCartResponse);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error getting the cart", error: error.message });
  }
};

module.exports = getCart;
