const {auth} = require("express-oauth2-jwt-bearer")

const checkJwt = auth({
    audience: process.env.AUDIENCE,
    issuerBaseURL: `https://${process.env.DOMAIN}`,
    algorithms: ["RS256"],
  });

  module.exports = checkJwt;