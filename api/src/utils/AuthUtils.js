const { Users } = require("../db");
const uuid = require("uuid");
const isAuthorized = async (userID,roles) => {
  const currentUser = await Users.findByPk(userID);
  console.log(currentUser.email, currentUser.systemRole)
  if (roles.includes(currentUser.systemRole) ) {
    return true;
  }
  return false;
};

const getUUID = async (auth0User) => {
  const userID = auth0User.split("|")[1];
  const userUUID = uuid.v5(userID, uuid.v5.URL);
  return userUUID;
};

module.exports = { isAuthorized, getUUID };
