const { UserServices } = require("../../db");
const { getUUID, isAuthorized } = require("../../utils/AuthUtils");
const deleteUserServiceById = async (req, res) => {
  try {
    let { id } = req.params;
    const userServiceID = await UserServices.findByPk(id);

    if (!userServiceID) {
      return res.status(400).send({ message: "Service not found" });
    }

    const auth0User = await req.auth.payload.sub;
    const rolesAllowed = ["Admin"];
    const auth0UserUUID = await getUUID(auth0User);

    if (
      (await isAuthorized(auth0UserUUID, rolesAllowed)) ||
      auth0UserUUID === userServiceID.userID
    ) {
    } else {
      return res.status(403).json({
        error: "Only the user and administrator can delete a service record",
      });
    }
    await userServiceID.destroy();
    return res.status(200).json("Service deleted");
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({
        message: "Error deleting UserService record",
        error: error.message,
      });
  }
};

module.exports = deleteUserServiceById;
