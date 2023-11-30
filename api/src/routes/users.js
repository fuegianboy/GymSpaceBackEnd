const { Router } = require("express");
const getAllUsers = require('./../controllers/user/getAllUsers.controller');
const createUser = require('./../controllers/user/createUser.controller');
const deleteUserById = require('./../controllers/user/deleteUserById.controller');
const updateUser = require('./../controllers/user/updateUser.controller');
const getUserById = require("../controllers/user/getUserById.controller");
const getUserFavorites = require("../controllers/user/getUserFavorites.controller");
const checkJwt = require("./auth0");
const router = Router();

router.get('/', getAllUsers);
router.get('/favorites/:id', getUserFavorites)
router.get('/:id',checkJwt, getUserById);
router.post('/', createUser);
router.delete('/:id',checkJwt, deleteUserById);
router.put('/:id', updateUser);


module.exports = router