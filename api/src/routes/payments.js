const { Router } = require("express");
const createOrder = require("../controllers/payments/createOrder");
const router = Router();


router.post("/create-order", createOrder)


module.exports = router