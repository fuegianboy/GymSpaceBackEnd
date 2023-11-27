const { UserServices } = require("../../db");
const { getUUID, isAuthorized } = require("../../utils/AuthUtils");
const updateUserService = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;
    const userService = await UserServices.findByPk(id);
        

    if (!userService) {
      return res.status(422).send({ message: "UserService not found" });
    }

    const auth0User = await req.auth.payload.sub;
    const rolesAllowed = ["Admin"];
    const auth0UserUUID = await getUUID(auth0User);
    
    if (
      (await isAuthorized(auth0UserUUID, rolesAllowed)) ||
      auth0UserUUID === userService.userID
    ) {
    } else {
      return res
        .status(403)
        .json({
          error: "Only the user and administrator can edit a service record",
        });
    }

    await userService.update({ ...data });
    return res.status(200).json(userService);
  } catch (error) {
    console.log(error);
    console.error(error);
    return res
      .status(500)
      .send({
        message: "Error modifying UserService record",
        error: error.message,
      });
  }
};

module.exports = updateUserService;
