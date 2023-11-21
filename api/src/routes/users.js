const { Router } = require("express");
const getAllUsers = require('./../controllers/user/getAllUsers.controller');
const createUser = require('./../controllers/user/createUser.controller');
const deleteUserById = require('./../controllers/user/deleteUserById.controller');
const updateUser = require('./../controllers/user/updateUser.controller');
const getUserById = require("../controllers/user/getUserById.controller");

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.delete('/:id', deleteUserById);
router.put('/:id', updateUser);

module.exports = router