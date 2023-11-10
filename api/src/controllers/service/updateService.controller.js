const { Services } = require("../../db")

const updateService = async (req, res) => {

    try {
        const data = req.body
        const {id} = req.params
        const service  = await Services.findByPk(id)

        if(!service) {
            return res.status(422).send({message:"Service not found"})
        }
        await service.update({ ...data })
        return res.status(200).json(service)
    } catch (error) {
        return res.status(500).send({ message: "Error retrieving Service record", error: error.message });
      }
}

module.exports = updateService
