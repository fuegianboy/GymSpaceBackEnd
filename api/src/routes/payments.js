const { Router } = require("express");
const createOrder = require("../controllers/payments/createOrder");
const updateOrder = require("../controllers/payments/updateOrder");
const checkJwt = require("./auth0")
const router = Router();

router.post("/create-order", checkJwt, createOrder)
router.get("/update", checkJwt, updateOrder)


module.exports = router