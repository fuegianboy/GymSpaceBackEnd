const { Coaches } = require("../../db");
const { isValidUUID } = require("../../utils");
const {getUUID, isAuthorized} = require("../../utils/AuthUtils")
const deleteCoachById = async (req, res) => {

    try {
        const { id } = req.params;

        const auth0User = await req.auth.payload.sub
        const rolesAllowed = ["Admin"]
        const userUUID = await getUUID(auth0User)
        
        if(!await isAuthorized(userUUID,rolesAllowed)){
            return res.status(403).json({error: `only ${rolesAllowed} allowed`})
        }
        if (!isValidUUID(id))
            return res.status(404).json({ error: "id must be UUID format" })

        const coach = await Coaches.findOne({ where: { userID: id } });

        if (!coach) {
            return res.status(404).json({ error: "Wrong ID, Coach Not Found" });
        }

        await Coaches.destroy({
            where: {
                userID: id
            }
        });

        return res.status(200).json("Successully Deleted");
    } catch (error) {
        console.log(error)
        return res.status(404).json({ error: error.message });
    }
}

module.exports = deleteCoachById;