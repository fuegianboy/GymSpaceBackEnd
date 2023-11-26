const { Router } = require("express");
const getResponse = require("../controllers/chat/getResponse");

const router = Router();

router.post("/response", getResponse)

module.exports = router

