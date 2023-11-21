const { Router } = require("express");
const usersRouter = require("./users")
const productsRouter = require("./products")
const servicesRouter = require("./services")
const coachesRouter = require("./coaches")
const paymentsRouter = require("./payments")
const mailerRouter = require("./mailer");
const whatsappRouter = require("./whatsapp")

const router = Router();

router.use("/users", usersRouter)
router.use("/products", productsRouter)
router.use("/services", servicesRouter)
router.use("/coaches", coachesRouter)

router.use("/payments", paymentsRouter)
router.use("/mailto", mailerRouter)
router.use("/whatsapp", whatsappRouter)




const createUserService = require("../controllers/userServices/createUserServices.controller");
const updateUserService = require("../controllers/userServices/updateUserServices.controller");
const deleteUserServiceById = require("../controllers/userServices/deleteUserServiceById.controller");
const getAllUserServices = require("../controllers/userServices/getAllUserServices.controller");

router.post("/userservices",createUserService)
router.put("/userservices/:id", updateUserService)
router.delete("/userservices/:id", deleteUserServiceById)
router.get("/userservices", getAllUserServices )

const createUserProduct = require("../controllers/userProducts/createUserProducts.controller");
const updateUserProduct = require("../controllers/userProducts/updateUserProducts.controller");
const deleteUserProductById = require("../controllers/userProducts/deleteUserProductsById.controller");
const getAllUserProducts = require("../controllers/userProducts/getAllUserProducts.controller");

router.post("/userproducts", createUserProduct)
router.put("/userproducts/:id", updateUserProduct)
router.delete("/userproducts/:id", deleteUserProductById)
router.get("/userproducts", getAllUserProducts)


module.exports = router;