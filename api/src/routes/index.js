const express = require("express")
const router = express.Router()
const { getProducts } = require("../controllers/product/getProducts.controller")
const {postProducts} = require("../controllers/product/postProducts.controller")
const {deleteProduct} = require("../controllers/product/deleteProductById.controller")
const {updateProduct} =require("../controllers/product/updateProduct.controller")


router.get("/products", getProducts)
router.post("/products", postProducts)
router.delete("/products/:id", deleteProduct)
router.put("/products/:id", updateProduct)


module.exports = router;