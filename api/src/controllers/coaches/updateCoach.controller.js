const { Coaches } = require("../../db");

const updateCoach = async (req, res) => {

    try {
        const data = req.body;
        const {id} = req.params;

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