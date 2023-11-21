const { Router } = require("express");
const sendWsMessage = require("../controllers/whatsapp/sendWsMessage");

const router = Router();

router.post("/send-message", sendWsMessage)

module.exports = router



