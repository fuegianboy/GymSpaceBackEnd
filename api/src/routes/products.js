const { Router } = require("express");
const { getProducts } = require("../controllers/product/getProducts.controller")
const { postProducts } = require("../controllers/product/postProducts.controller")
const { deleteProduct } = require("../controllers/product/deleteProductById.controller")
const { updateProduct } = require("../controllers/product/updateProduct.controller")
const { getProductByID } = require("../controllers/product/getProductByID.controller")

const router = Router();

router.get("/", getProducts)
router.get("/:id", getProductByID)
router.post("/", postProducts)
router.delete("/:id", deleteProduct)
router.put("/:id", updateProduct)


module.exports = router