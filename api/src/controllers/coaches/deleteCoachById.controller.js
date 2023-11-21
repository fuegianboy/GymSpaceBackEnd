const { Coaches } = require("../../db");

const deleteCoachById = async (req, res) => {

    try {
        const {id} = req.params;

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
        return res.status(404).json({error:error.message});
    }
}

module.exports = deleteCoachById;