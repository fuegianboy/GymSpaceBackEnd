const { Router } = require("express");
const usersRouter = require("./users")
const productsRouter = require("./products")
const servicesRouter = require("./services")
const coachesRouter = require("./coaches")
const userProductsRouter = require("./userProducts")
const userServicesRouter = require("./userServices")
const paymentsRouter = require("./payments")
const mailerRouter = require("./mailer");
const whatsappRouter = require("./whatsapp")
const getToken = require("../controllers/auth0/getToktn.controller")


const router = Router();

router.use("/users", usersRouter)
router.use("/products", productsRouter)
router.use("/services", servicesRouter)
router.use("/coaches", coachesRouter)
router.use("/userservices", userServicesRouter)
router.use("/userproducts", userProductsRouter)

router.use("/payments", paymentsRouter)
router.use("/mailto", mailerRouter)
router.use("/whatsapp", whatsappRouter)
router.get("/token", getToken)


module.exports = router;