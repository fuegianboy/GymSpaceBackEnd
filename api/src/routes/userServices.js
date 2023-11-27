const { Router } = require("express");
const getAllUserServices = require("../controllers/userServices/getAllUserServices.controller");
const getUserServiceById = require("../controllers/userServices/getUserServiceById.controller");
const createUserService = require("../controllers/userServices/createUserServices.controller");
const updateUserService = require("../controllers/userServices/updateUserServices.controller");
const deleteUserServiceById = require("../controllers/userServices/deleteUserServiceById.controller");
const sendBulkEmails = require("../controllers/userServices/sendBulkEmails.controller");
const checkJwt = require("./auth0")
const router = Router();

router.get("/", checkJwt, getAllUserServices)
router.get("/:id", checkJwt, getUserServiceById)
router.post("/", checkJwt, createUserService)
router.put("/:id", checkJwt, updateUserService)
router.delete("/:id", checkJwt, deleteUserServiceById)
router.post("/send-emails", checkJwt, sendBulkEmails)


module.exports = router
