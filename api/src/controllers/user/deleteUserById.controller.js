const { Users } = require("../../db")
const { isValidUUID } = require("../../utils")
const {getUUID, isAdmin} = require("../../utils/AuthUtils")

const deleteUserById = async (req, res) => {

    try {
        const { id } = req.params
        
        const auth0User = await req.auth.payload.sub
        
        const userUUID = await getUUID(auth0User)
        
        if(!await isAdmin(userUUID)){
            return res.status(401).json({error: "Only Admin allowed"})
        }
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