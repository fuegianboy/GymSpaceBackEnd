const { Coaches } = require("../../db");

const createCoach = async (req, res) => {

    const {
        firstName,
        lastName,
        photo,
        valuation
    } = req.body;
    try {
        if (!firstName || !lastName || !photo || !valuation) {
            return res.status(404).json({error:"Data Incomplete"});
        }

        const [newcoach,created] = await Coaches.findOrCreate({
            where: { ...req.body },
        })

        return res.status(200).json(newcoach);
    } catch (error) {
        return res.status(404).json({error:error.message});
    }
}

module.exports = createCoach;