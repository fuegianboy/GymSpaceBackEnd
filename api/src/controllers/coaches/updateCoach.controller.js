const { Coaches } = require("../../db");

const updateCoach = async (req, res) => {

    try {
        const data = req.body;
        const {id} = req.params;

        const coach = await Coaches.findByPk(id);

        if(!coach) {
            return res.status(422).send({error:"Coach not found"});
        }
        
        await coach.update({ ...data });
        
        return res.status(200).json(coach);
    } catch (error) {
        return res.status(404).json({error:error.message})
    }
}

module.exports = updateCoach;