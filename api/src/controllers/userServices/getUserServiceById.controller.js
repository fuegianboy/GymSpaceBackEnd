const { UserServices } = require("../../db")

module.exports = async (req, res) => {

    try {
        let { id } = req.params
        const order = await UserServices.findByPk(id)

        if (!order) {
            return res.status(400).send({ message: "Order not found" })
        }

        return res.status(200).json(order)
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Error deleting UserService record",
            error: error.message
        });
    }
}