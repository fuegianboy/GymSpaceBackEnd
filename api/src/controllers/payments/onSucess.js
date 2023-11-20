const updateOrder = require("../../handlers/payments/updateOrder")
const samples = require("../../utils/mails/samples");
const sendOrderConfirmationEmail = require("../../handlers/payments/sendOrderConfirmationEmail");

const onSucess = async (req, res) => {
    try {
        await updateOrder(req.query)
        await sendOrderConfirmationEmail(req.query.external_reference, samples.success)

        return res.json({
            message: "Orders updated",
            status: "success",
            data: req.query
        })
    } catch (error) {
        console.log(error)
        return res.status(404).json({ error: error.message });
    }
}

module.exports = onSucess