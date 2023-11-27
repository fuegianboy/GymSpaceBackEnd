const { Op } = require("sequelize")
const { Services } = require("../../db")
const { isValidHourMinuteFormat } = require("../../utils/")
const { isValidImageUrl } = require("../../utils/isValidImageUrl")
const {getUUID, isAuthorized} = require("../../utils/AuthUtils")
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
        const auth0User = await req.auth.payload.sub
        const rolesAllowed = ["Admin", "Coach"]
        const userUUID = await getUUID(auth0User)
        
        if(!await isAuthorized(userUUID,rolesAllowed)){
            return res.status(403).json({error: `only ${rolesAllowed} allowed`})
        }
        if (!name || !description || !category || !price ||
            !startTime || !duration || !image || !status || !coachID ||
            !capacity || !areaID)
            return res.status(404).json("Incomplete data")

        // Validate types and format

        if (isNaN(price))
            return res.status(404).json({ error: "price is not a number" })

        if (!isValidHourMinuteFormat(startTime))
            return res.status(404).json({ error: 'Start time must be in "hour:minute" format ("00:00" to "23:59").' })

        if (isNaN(duration) || !Number.isInteger(duration))
            return res.status(404).json({ error: "Duration must be an Integer." })

        if (!isValidImageUrl(image))
            return res.status(404).json({ error: "Invalid image url." })

        if (isNaN(capacity) || !Number.isInteger(capacity))
            return res.status(404).json({ error: "Capacity must be an Integer." })

        // Validate uniqueness
        
        const [service, created] = await Services.findOrCreate({
            where: {
                [Op.or]: [{ name }]
            },
            defaults: { ...req.body }
        })

        if (!created)
            return res.status(404).json({
                error: `Service with name "${name}" already exists.`
            })

        return res.status(200).json(service)
    } catch (error) {
        return res.status(500).send({ message: "Error saving Service record", error: error.message });
    }
}

module.exports = createService;