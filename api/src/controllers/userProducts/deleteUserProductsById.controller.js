const { UserProducts } = require("../../db");
const { getUUID, isAuthorized } = require("../../utils/AuthUtils");
const deleteUserProductById = async (req, res) => {
  try {
    let { id } = req.params;
    const userProductID = await UserProducts.findByPk(id);

    if (!userProductID) {
      return res.status(400).send({ message: "Product not found" });
    }

    const auth0User = await req.auth.payload.sub;
    const rolesAllowed = ["Admin"];
    const auth0UserUUID = await getUUID(auth0User);

    if (
      (await isAuthorized(auth0UserUUID, rolesAllowed)) ||
      auth0UserUUID === userProductID.userID
    ) {
    } else {
      return res.status(403).json({
        error: "Only the user and administrator can delete a product record",
      });
    }

    await userProductID.destroy();
    return res.status(200).json("Product deleted");
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({
        message: "Error deleting UserProduct record",
        error: error.message,
      });
  }
};

module.exports = deleteUserProductById;
