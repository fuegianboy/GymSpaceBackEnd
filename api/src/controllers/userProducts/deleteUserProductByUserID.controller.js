const { UserProducts } = require("../../db");

const deleteUserProductsByUserId = async (req, res) => {
  try {
    const { userID } = req.body;

    if (!userID) {
      return res.status(400).send({ message: "Missing userID in the request body" });
    }

    const userProductsToDelete = await UserProducts.findAll({
      where: {
        userID: userID,
      },
    });

    if (!userProductsToDelete || userProductsToDelete.length === 0) {
      return res.status(404).send({ message: "No user products found for the specified userID" });
    }

    await UserProducts.destroy({
      where: {
        userID: userID,
      },
    });

    return res.status(200).json({ message: "User products deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error deleting user products", error: error.message });
  }
};

module.exports = deleteUserProductsByUserId;
