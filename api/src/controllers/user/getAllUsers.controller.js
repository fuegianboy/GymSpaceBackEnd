const { Users } = require("../../db")

const getAllUsers = async (req, res) => {

    try {
        const data = await Users.findAll();
        return res.status(200).json(data)
    } catch (error) {
        return res.status(404).json({})
    }
}

module.exports = getAllUsers;