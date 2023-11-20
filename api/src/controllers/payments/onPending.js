const updateOrder = require("../../handlers/payments/updateOrder")
const samples = require("../../utils/mails/samples")

const onPending = async (req, res) => {
    try {
        await updateOrder(req.query)
        await sendOrderConfirmationEmail(req.query.external_reference, samples.pending)

        return res.json({
            message: "Orders updated",
            status: "pending",
            data: req.query
        })
    } catch (error) {

    }
}

module.exports = onPending