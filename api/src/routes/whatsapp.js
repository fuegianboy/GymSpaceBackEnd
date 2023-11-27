const { Router } = require("express");
const sendWsMessage = require("../controllers/whatsapp/sendWsMessage");
const checkJwt = require("./auth0")
const router = Router();

router.post("/send-message", checkJwt, sendWsMessage)

module.exports = router



