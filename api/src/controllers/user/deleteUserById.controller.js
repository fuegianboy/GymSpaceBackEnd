const { Users } = require("../../db")
const {getUUID} = require("../../utils/AuthUtils")

const deleteUserById = async (req, res) => {

    try {
        const { id } = req.params
        const userUUID = await getUUID(id)
        await Users.destroy({
            where: {
                userID: userUUID
            }
        })
        return res.status(200).json("Correctly removed")
    } catch (error) {
        console.error(error);
        return res.status(404).json({ error: error.message })
    }
}

module.exports = deleteUserById;