const { Router } = require("express");
const createOrder = require("../controllers/payments/createOrder");
const updateOrder = require("../controllers/payments/updateOrder");

const router = Router();

router.post("/create-order", createOrder)
router.get("/update", updateOrder)


module.exports = router