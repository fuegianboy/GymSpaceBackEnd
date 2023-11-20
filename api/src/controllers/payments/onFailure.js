const updateOrder = require("../../handlers/payments/updateOrder")
const samples = require("../../utils/mails/samples")
const sendOrderConfirmationEmail = require("../../handlers/payments/sendOrderConfirmationEmail");

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
        console.log(error)
        return res.status(404).json({ error: error.message });
    }
}

module.exports = onFailure