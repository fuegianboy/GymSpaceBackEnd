const { Users } = require("../../db")
const { Op } = require("sequelize");
const uuid = require('uuid');

const getUserById = async (req, res) => {
  console.log(req.headers)
    let { userID } = req.params
    userID = userID.split("|")[1]
    const uuidFromAuth0UserId = uuid.v5(userID, uuid.v5.URL)
    const userFound = await Users.findAll({
        where: {
          userID: uuidFromAuth0UserId
        },
      });
      if (!userFound.length) {
        return res.status(400).send({ message: "User not register" });
      }
    return res.status(200).json(userFound[0]);
    

}

module.exports = getUserById;