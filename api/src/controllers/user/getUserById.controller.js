const { Users } = require("../../db")
const { isValidUUID } = require("../../utils")

const getUserById = async (req, res) => {

    try {
        const { id } = req.params

        if (!isValidUUID(id))
            return res.status(404).json({ error: "id must be UUID format" })

        const user = await Users.findByPk(id)

        if (!user)
            return res.status(404).json({ error: "User not found" });

        return res.status(200).json(user)
    } catch (error) {
        console.error(error);
        return res.status(404).json({ error: error.message })
    }
}

module.exports = getUserById;