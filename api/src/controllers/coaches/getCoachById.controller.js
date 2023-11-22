const { Coaches } = require("../../db");
const { isValidUUID } = require("../../utils");

module.exports = async (req, res) => {

    try {
        const { id } = req.params;

        if (!isValidUUID(id))
            return res.status(404).json({ error: "id must be UUID format" })

        const coach = await Coaches.findOne({ where: { userID: id } });

        if (!coach) {
            return res.status(404).json({ error: "Wrong ID, Coach Not Found" });
        }

        return res.status(200).json(coach);
    } catch (error) {
        console.log(error)
        return res.status(404).json({ error: error.message });
    }
}
