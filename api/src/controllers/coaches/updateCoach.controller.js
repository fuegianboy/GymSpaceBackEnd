const { Coaches } = require("../../db");
const { getUUID, isAuthorized } = require("../../utils/AuthUtils");
const { isValidUUID } = require("../../utils")
const updateCoach = async (req, res) => {

    try {
        const data = req.body;
        const {id} = req.params;

        const userUUID = isValidUUID(id) ? id : getUUID(id);
        const auth0User = await req.auth.payload.sub;
        const rolesAllowed = ["Admin"];
        const auth0UserUUID = await getUUID(auth0User);
        
        if (await isAuthorized(auth0UserUUID, rolesAllowed) || auth0UserUUID === userUUID) {
            
          } else {
            return res.status(403).json({ error: "Only the user and administrator are allowed to edit the user" });
          }
        // An User is not allowed to change his status or role
        if (auth0UserUUID === userUUID) {
          const { systemRole, status } = data;
          if (systemRole || status) {
            return res
              .status(403)
              .json({
                error: `The user does not have permissions to change their role or status`,
              });
          }
        }
        const coach = await Coaches.findByPk(id);

        if(!coach) {
            return res.status(404).json({error:"Coach not found"});
        }

        if ("valuation" in data) {
            const valNum = Number(data.valuation);
            if (valNum<1&&valNum>10) {
                return res.status(404).json({error:'Valuation must be between 1 and 10'});
            }
        }
        
        await coach.update({ ...data });
        
        return res.status(200).json(coach);
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}

module.exports = updateCoach;