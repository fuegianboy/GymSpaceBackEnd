const { Router } = require("express");
const getAllUserProducts = require("../controllers/userProducts/getAllUserProducts.controller");
const getUserProductById = require("../controllers/userProducts/getUserProductById.controller");
const createUserProduct = require("../controllers/userProducts/createUserProducts.controller");
const updateUserProduct = require("../controllers/userProducts/updateUserProducts.controller");
const deleteUserProductById = require("../controllers/userProducts/deleteUserProductsById.controller");
const deleteUserProductsByUserId = require("../controllers/userProducts/deleteUserProductByUserID.controller");

const router = Router();

router.get("/", getAllUserProducts)
router.get("/:id", getUserProductById)
router.post("/", createUserProduct)
router.put("/:id", updateUserProduct)
router.delete("/:id", deleteUserProductById)
router.delete("/", deleteUserProductsByUserId)


module.exports = router
