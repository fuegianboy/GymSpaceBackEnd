const { Router } = require("express");
const getAllServices = require("../controllers/service/getAllServices.controller");
const createService = require("../controllers/service/createService.controller");
const deleteServiceById = require("../controllers/service/deleteServiceById.controller");
const updateService = require("../controllers/service/updateService.controller");
const getServiceById = require("../controllers/service/getServiceById.controller");

const router = Router();

router.get("/", getAllServices)
router.get("/:id", getServiceById)
router.post("/", createService)
router.delete("/:id", deleteServiceById)
router.put("/:id", updateService)

module.exports = router