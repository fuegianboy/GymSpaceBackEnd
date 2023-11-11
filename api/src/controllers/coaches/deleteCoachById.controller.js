const { Coaches } = require("../../db");

const deleteCoachById = async (req, res) => {

    try {
        const {id} = req.params;

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