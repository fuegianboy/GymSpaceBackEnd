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