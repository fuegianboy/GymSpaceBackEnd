const { Router } = require("express");
const router = Router();

// Users

const usersRouter = require("./users")
router.use("/users", usersRouter)

const { getProducts } = require("../controllers/product/getProducts.controller")
const {postProducts} = require("../controllers/product/postProducts.controller")
const {deleteProduct} = require("../controllers/product/deleteProductById.controller")

const {updateProduct} =require("../controllers/product/updateProduct.controller")
const { getProductByID } = require("../controllers/product/getProductByID.controller")

router.get("/products", getProducts)
router.get("/products/:id", getProductByID)
router.post("/products", postProducts)
router.delete("/products/:id", deleteProduct)
router.put("/products/:id", updateProduct)



const getAllServices = require("../controllers/service/getAllServices.controller");
const createService = require("../controllers/service/createService.controller");
const deleteServiceById = require("../controllers/service/deleteServiceById.controller");
const updateService = require("../controllers/service/updateService.controller");

router.get("/services", getAllServices)
router.post("/services", createService)
router.delete("/services/:id", deleteServiceById)
router.put("/services/:id", updateService)

const createCoach = require('../controllers/coaches/createCoach.controller');
const deleteCoachById = require('../controllers/coaches/deleteCoachById.controller');
const getCoaches = require('../controllers/coaches/getCoaches.controller');
const updateCoach = require('../controllers/coaches/updateCoach.controller');

router.get('/coaches',getCoaches);
router.delete('/coaches/:id',deleteCoachById);
router.put('/coaches/:id',updateCoach);
router.post('/coaches',createCoach);


// Payments

const paymentsRouter = require("./payments")
router.use("/payments", paymentsRouter)

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

// Mailer

const mailerRouter = require("./mailer");
router.use("/mailto", mailerRouter)

// Whatsapp

const whatsappRouter = require("./whatsapp")
router.use("/whatsapp", whatsappRouter)


module.exports = router;