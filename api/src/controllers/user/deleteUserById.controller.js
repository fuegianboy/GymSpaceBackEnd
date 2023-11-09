const { Users } = require("../../db")

const deleteUserById = async (req, res) => {

    try {
        await Users.destroy({
            where: {
                id: req.params.id
            }
        })
        return res.status(200).json("Eliminado correctamente")
    } catch (error) {
        return res.status(404).json({})
    }
}

module.exports = deleteUserById;