const { Services } = require("../../db")

const createService = async (req, res) => {

    const {
        name,
        description,
        category,
        price,
        startTime,
        duration,
        image,
        status,
        coachID,
        capacity,
        areaID,
    } = req.body
    try {
        if (!name || !description || !category || !price ||
            !startTime || !duration || !image || !status || !coachID ||
            !capacity || !areaID)
            return res.status(404).json("Incomplete data")

        const service = await Services.create({
            name,
            description,
            category,
            price,
            startTime,
            duration,
            image,
            status,
            coachID,
            capacity,
            areaID,
        })

        return res.status(200).json(service)
    } catch (error) {
        return res.status(500).send({ message: "Error saving Service record", error: error.message });
    }
}

module.exports = createService;