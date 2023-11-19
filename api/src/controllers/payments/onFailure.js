const updateOrder = require("../../handlers/payments/updateOrder")

const onFailure = async (req, res) => {
    try {
        await updateOrder(req.query)

        // Send email
        
        return res.json({ message: "Orders updated", status: "failure" })
    } catch (error) {

    }
}

module.exports = onFailure