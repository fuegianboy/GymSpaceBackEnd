const { Router } = require("express");
const getAllUserProducts = require("../controllers/userProducts/getAllUserProducts.controller");
const getUserProductById = require("../controllers/userProducts/getUserProductById.controller");
const createUserProduct = require("../controllers/userProducts/createUserProducts.controller");
const updateUserProduct = require("../controllers/userProducts/updateUserProducts.controller");
const deleteUserProductById = require("../controllers/userProducts/deleteUserProductsById.controller");
const checkJwt = require("./auth0")
const router = Router();

router.get("/", checkJwt, getAllUserProducts)
router.get("/:id", checkJwt, getUserProductById)
router.post("/", checkJwt, createUserProduct)
router.put("/:id", checkJwt, updateUserProduct)
router.delete("/:id", checkJwt, deleteUserProductById)


module.exports = router
