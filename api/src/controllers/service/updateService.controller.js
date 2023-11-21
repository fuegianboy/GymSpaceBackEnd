const { Op } = require("sequelize")
const { Services } = require("../../db")
const { isValidHourMinuteFormat, isValidImageUrl, isValidUUID } = require("../../utils")
const { isValidPositiveInteger } = require("../../utils")

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

        if (price && isNaN(price))
            return res.status(404).json({ error: "price is not a number" })

        if (duration && !isValidPositiveInteger(duration))
            return res.status(404).json({ error: `duration must be an integer number.` })

        if (capacity && !isValidPositiveInteger(capacity))
            return res.status(404).json({ error: `capacity must be an integer number.` })

        // Format Validation

        if (startTime && !isValidHourMinuteFormat(startTime))
            return res.status(404).json({ error: 'Start time must be in "hour:minute" format ("00:00" to "23:59").' })

        if (image && !isValidImageUrl(image))
            return res.status(404).json({ error: "Invalid image url." })

        if (id && !isValidUUID(id))
            return res.status(404).json({ error: "Id must have UUID format." })

        // Uniqueness Validation

        const sameNameService = name && await Services.findOne({
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
