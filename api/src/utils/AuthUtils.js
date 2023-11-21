const { Users } = require("../db");
const uuid = require("uuid");
const isAdmin = async (userID) => {
  const currentUser = await Users.findByPk(userID);
  if (currentUser.systemRole === "Admin") {
    return true;
  }
  return false;
};

const getUUID = async (auth0User) => {
  const userID = auth0User.split("|")[1];
  const userUUID = uuid.v5(userID, uuid.v5.URL);
  return userUUID;
};

module.exports = { isAdmin, getUUID };
