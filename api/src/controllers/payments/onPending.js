const updateOrder = require("../../handlers/payments/updateOrder")

const onPending = async (req, res) => {
    try {
        await updateOrder(req.query)

        // Send email
       
        return res.json({
            message: "Orders updated",
            status: "pending",
            data: req.query
        })
    } catch (error) {

    }
}

module.exports = onPending