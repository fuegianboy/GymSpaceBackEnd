const { Router } = require("express");

const getCoaches = require('../controllers/coaches/getCoaches.controller');
const getCoachById = require('../controllers/coaches/getCoachById.controller');
const createCoach = require('../controllers/coaches/createCoach.controller');
const deleteCoachById = require('../controllers/coaches/deleteCoachById.controller');
const updateCoach = require('../controllers/coaches/updateCoach.controller');
const checkJwt = require("./auth0")
const router = Router();

router.get('/', getCoaches);
router.get('/:id', getCoachById);
router.delete('/:id', deleteCoachById);
router.put('/:id', updateCoach);
router.post('/', createCoach);


module.exports = router