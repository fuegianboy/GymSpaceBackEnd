const { Router } = require("express");
const mailTo = require("../controllers/mailer/mailTo");
const checkJwt = require("./auth0")
const router = Router();

router.post("/", checkJwt, mailTo)

module.exports = router
