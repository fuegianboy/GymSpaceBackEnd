const { UserServices } = require("../../db");

const deleteUserServicesByUserId = async (req, res) => {
  try {
    const { userID } = req.body;

    if (!userID) {
      return res.status(400).send({ message: "Missing userID in the request body" });
    }

    const userServicesToDelete = await UserServices.findAll({
      where: {
        userID: userID,
      },
    });

    if (!userServicesToDelete || userServicesToDelete.length === 0) {
      return res.status(404).send({ message: "No user services found for the specified userID" });
    }

    await UserServices.destroy({
      where: {
        userID: userID,
      },
    });

    return res.status(200).json({ message: "User services deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error deleting user services", error: error.message });
  }
};

module.exports = deleteUserServicesByUserId;