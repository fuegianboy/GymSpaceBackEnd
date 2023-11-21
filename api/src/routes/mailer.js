const { Router } = require("express");
const mailTo = require("../controllers/mailer/mailTo");

const router = Router();

router.post("/", mailTo)

module.exports = router
