const { Users } = require("../../db")

const deleteUserById = async (req, res) => {

    try {
        const { id } = req.params
        await Users.destroy({
            where: {
                userID: id
            }
        })
        return res.status(200).json("Eliminado correctamente")
    } catch (error) {
        console.error(error);
        return res.status(404).json({ error: error.message })
    }
}

module.exports = deleteUserById;