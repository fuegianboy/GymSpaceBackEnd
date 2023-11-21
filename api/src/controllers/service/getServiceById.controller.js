const { Services } = require("../../db")
const { isValidUUID } = require("../../utils")

module.exports = async (req, res) => {

    try {
        let { id } = req.params

        if (!isValidUUID(id))
            return res.status(404).json({ error: "id must be UUID format" })

        const service = await Services.findByPk(id)

        if (!service) {
            return res.status(404).send({ message: "Service not found" })
        }

        return res.status(200).json(service)
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Error deleting Service record",
            error: error.message
        });
    }
}
