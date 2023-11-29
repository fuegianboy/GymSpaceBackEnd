const { Op } = require("sequelize");
const { Users } = require("../../db");
const { UserProducts } = require("../../db");
const { getUUID } = require("../../utils/AuthUtils");
const updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = req.body;
    const { products } = data;
    const userUUID = await getUUID(id);


    const userCart = await UserProducts.findAll({
      where: {
        userID: userUUID,
        mp_status: "inCart",
      },
    });
    if (userCart.length) {
      userCart.map((product) => {
        product.destroy();
      });
    }

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

    return res.status(200).json({ message: "Your cart was updated" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error updating the cart", error: error.message });
  }
};

module.exports = updateCart;
