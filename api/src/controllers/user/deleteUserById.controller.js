const { Users } = require("../../db")
const { isValidUUID } = require("../../utils")

const deleteUserById = async (req, res) => {

    try {
        const { id } = req.params

        if (!isValidUUID(id))
            return res.status(404).json({ error: "id must be UUID format" })

        const userFound = await Users.findByPk(id)

        if (!userFound)
            return res.status(404).json({ error: "User not found" });

        await Users.destroy({
            where: {
                userID: id
            }
        })
        return res.status(200).json("Correctly removed")
    } catch (error) {
        console.error(error);
        return res.status(404).json({ error: error.message })
    }
}

module.exports = deleteUserById;