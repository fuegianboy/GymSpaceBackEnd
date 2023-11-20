const updateOrder = require("../../handlers/payments/updateOrder")
const samples = require("../../utils/mails/samples")

const onFailure = async (req, res) => {
    try {
        await updateOrder(req.query)
        await sendOrderConfirmationEmail(req.query.external_reference, samples.failure)

        return res.json({
            message: "Orders updated",
            status: "failure",
            data: req.query
        })
    } catch (error) {

    }
}

module.exports = onFailure