const { Router } = require("express");
const createOrder = require("../controllers/payments/createOrder");
const onSucess = require("../controllers/payments/onSucess")
const onFailure = require("../controllers/payments/onFailure")
const onPending = require("../controllers/payments/onPending")

const router = Router();

router.post("/create-order", createOrder)
router.get("/success", onSucess)
router.get("/failure", onFailure)
router.get("/pending", onPending)


module.exports = router