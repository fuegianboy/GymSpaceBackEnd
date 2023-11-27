const { Router } = require("express");
const { getProducts } = require("../controllers/product/getProducts.controller")
const { postProducts } = require("../controllers/product/postProducts.controller")
const { deleteProduct } = require("../controllers/product/deleteProductById.controller")
const { updateProduct } = require("../controllers/product/updateProduct.controller")
const { getProductByID } = require("../controllers/product/getProductByID.controller")
const checkJwt = require("./auth0")
const router = Router();

router.get("/",checkJwt, getProducts)
router.get("/:id",checkJwt, getProductByID)
router.post("/",checkJwt, postProducts)
router.delete("/:id",checkJwt, deleteProduct)
router.put("/:id",checkJwt, updateProduct)


module.exports = router