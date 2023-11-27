const { Router } = require("express");
const getResponse = require("../controllers/chat/getResponse");
const checkJwt = require("./auth0")
const router = Router();

router.post("/response", checkJwt, getResponse)

module.exports = router

