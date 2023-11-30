const { Router } = require("express");
const createOrder = require("../controllers/payments/createOrder");
const updateOrder = require("../controllers/payments/updateOrder");
const getUserByOrder = require("../controllers/payments/getUserByOrder");

const router = Router();

router.post("/create-order", createOrder)
router.get("/update", updateOrder)
router.get("/:external_reference", getUserByOrder)


module.exports = router