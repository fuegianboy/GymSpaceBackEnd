const updateOrder = require("../../handlers/payments/updateOrder")

const onSucess = async (req, res) => {
    try {
        await updateOrder(req.query)

        // Send email

        return res.json({ message: "Orders updated", status: "success" })
    } catch (error) {
        console.log(error)
        return res.status(404).json({ error: error.message });
    }
}

module.exports = onSucess