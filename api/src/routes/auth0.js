const {auth} = require("express-oauth2-jwt-bearer")

const checkJwt = auth({
    audience: "https://gymspacebackend-production-421c.up.railway.app/",
    issuerBaseURL: 'https://dev-y4mdv7lm3spxjtu2.us.auth0.com',
    algorithms: ["RS256"],
  });

  module.exports = checkJwt;