const { Router } = require("express");
const router = Router();

const createUser = require('./../controllers/user/createUser.controller');
const deleteUserById = require('./../controllers/user/deleteUserById.controller');
const getAllUsers = require('./../controllers/user/getAllUsers.controller');
const updateUser = require('./../controllers/user/updateUser.controller');

router.get('/users',getAllUsers);
router.delete('/users/:id', deleteUserById);
router.put('/users/:id', updateUser);
router.post('/users', createUser);

const { getProducts } = require("../controllers/product/getProducts.controller")
const {postProducts} = require("../controllers/product/postProducts.controller")
const {deleteProduct} = require("../controllers/product/deleteProductById.controller")
const {updateProduct} =require("../controllers/product/updateProduct.controller");

const getAllServices = require("../controllers/service/getAllServices.controller");
const createService = require("../controllers/service/createService.controller");
const deleteServiceById = require("../controllers/service/deleteServiceById.controller");
const updateService = require("../controllers/service/updateService.controller");

router.get("/products", getProducts)
router.post("/products", postProducts)
router.delete("/products/:id", deleteProduct)
router.put("/products/:id", updateProduct)

router.get("/services", getAllServices)
router.post("/services", createService)
router.delete("/services/:id", deleteServiceById)
router.put("/services/:id", updateService)

module.exports = router;