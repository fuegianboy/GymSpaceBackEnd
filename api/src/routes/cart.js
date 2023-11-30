const { Router } = require("express");
const getCart = require('./../controllers/cart/getCart.controller');
const updateCart = require('./../controllers/cart/updateCart.controller');
const checkJwt = require("./auth0");
const router = Router();

router.get('/:id', getCart);
router.put('/:id', updateCart);


module.exports = router