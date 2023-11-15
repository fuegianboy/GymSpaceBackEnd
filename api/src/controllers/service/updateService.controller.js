const { Op } = require("sequelize")
const { Services } = require("../../db")
const { isValidHourMinuteFormat, isValidImageUrl, isValidUUID } = require("../../utils")

const updateService = async (req, res) => {

    try {
        const data = req.body
        const { id } = req.params
        const {
            name,
            description,
            category,
            price,
            startTime,
            duration,
            image,
            status,
            capacity,
            coachID,
            areaID,
        } = req.body

        // Data Type Validation

        if (isNaN(price))
            return res.status(404).json({ error: "price is not a number" })

        if (isNaN(duration) || !Number.isInteger(duration))
            return res.status(404).json({ error: "Duration must be an Integer." })

        if (isNaN(capacity) || !Number.isInteger(capacity))
            return res.status(404).json({ error: "Capacity must be an Integer." })

        // Format Validation

        if (!isValidHourMinuteFormat(startTime))
            return res.status(404).json({ error: 'Start time must be in "hour:minute" format ("00:00" to "23:59").' })

        if (!isValidImageUrl(image))
            return res.status(404).json({ error: "Invalid image url." })

        if (!isValidUUID(id))
            return res.status(404).json({ error: "Id must have UUID format." })

        // Uniqueness Validation
        
        const sameNameService = await Services.findOne({
            where: {
                name,
                serviceID: { [Op.not]: id }
            },
        })

        if (sameNameService)
            return res.status(404).json({ error: "Name already registered" })
        
        // Referential Integrity Validation

        const service = await Services.findByPk(id)

        if (!service) {
            return res.status(422).json({ error: "Service not found" })
        }

        // Update service

        await service.update({ ...data })
        return res.status(200).json(service)

    } catch (error) {
        return res.status(500).send({
            message: "Error retrieving Service record",
            error: error.message
        });
    }
}

module.exports = updateService
