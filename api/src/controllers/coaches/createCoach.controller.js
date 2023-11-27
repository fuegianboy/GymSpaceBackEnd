const { Coaches } = require("../../db");
const {getUUID, isAuthorized} = require("../../utils/AuthUtils")
const createCoach = async (req, res) => {

    const {
        firstName,
        lastName,
        photo,
        valuation
    } = req.body;
    try {
        const auth0User = await req.auth.payload.sub
        const rolesAllowed = ["Admin"]
        const userUUID = await getUUID(auth0User)
        
        if(!await isAuthorized(userUUID,rolesAllowed)){
            return res.status(403).json({error: `only ${rolesAllowed} allowed`})
        }
        if (!firstName || !lastName || !photo || !valuation) {
            return res.status(404).json({error:"Data Incomplete"});
        }

        const valNum = Number(valuation);
        if (valNum>10||valNum<1) {
            return res.status(404).json({error:"Invalid valuation Number"});
        }

        const [newcoach,created] = await Coaches.findOrCreate({
            where: { ...req.body },
        });

        if (!created) {
            return res.status(404).json({error:"Error while creating coach"});
        }

        return res.status(200).json(newcoach);
    } catch (error) {
        return res.status(404).json({error:error.message});
    }
}

module.exports = createCoach;