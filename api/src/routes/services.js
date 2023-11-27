const { Router } = require("express");
const getAllServices = require("../controllers/service/getAllServices.controller");
const createService = require("../controllers/service/createService.controller");
const deleteServiceById = require("../controllers/service/deleteServiceById.controller");
const updateService = require("../controllers/service/updateService.controller");
const getServiceById = require("../controllers/service/getServiceById.controller");
const checkJwt = require("./auth0")
const router = Router();

router.get("/", checkJwt, getAllServices)
router.get("/:id", checkJwt, getServiceById)
router.post("/", checkJwt, createService)
router.delete("/:id", checkJwt, deleteServiceById)
router.put("/:id", checkJwt, updateService)

module.exports = router