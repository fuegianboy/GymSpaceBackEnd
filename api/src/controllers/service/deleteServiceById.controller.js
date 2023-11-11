const { Services } = require("../../db")

const deleteServiceById = async (req, res) => {

    let {id} = req.params
    const serviceID = await Services.findByPk(id)

    if(!serviceID) {
        return res.status(400).send({message:"Service not found"})
    }

    try {
        await serviceID.destroy()
        // await Services.destroy({
        //     where: {
        //         id: serviceID
        //     }
        // })
        return res.status(200).json("Service deleted")
    } catch (error) {
        return res.status(500).send({ message: "Error deleting Service record", error: error.message });
      }
}

module.exports = deleteServiceById;