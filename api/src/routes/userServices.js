const { Router } = require("express");
const getAllUserServices = require("../controllers/userServices/getAllUserServices.controller");
const getUserServiceById = require("../controllers/userServices/getUserServiceById.controller");
const createUserService = require("../controllers/userServices/createUserServices.controller");
const updateUserService = require("../controllers/userServices/updateUserServices.controller");
const deleteUserServiceById = require("../controllers/userServices/deleteUserServiceById.controller");
const sendUserServicesAlert = require("../controllers/userServices/sendUserServicesAlert.controller");

const router = Router();

router.get("/", getAllUserServices)
router.get("/:id", getUserServiceById)
router.post("/", createUserService)
router.put("/:id", updateUserService)
router.delete("/:id", deleteUserServiceById)
router.post("/alert", sendUserServicesAlert)


module.exports = router
