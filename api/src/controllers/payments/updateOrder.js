const updateOrderHandler = require("../../handlers/payments/updateOrder")
const samples = require("../../utils/mails/samples");
const getOrderOwner = require("../../handlers/payments/getOrderOwner");
const sendWsMessage = require("../../handlers/whatsapp/sendWsMessage");
const sendEmail = require("../../handlers/mailer/sendEmail");

const updateOrder = async (req, res) => {
    try {
        await updateOrderHandler(req.query)

        // Send notifications
        const { external_reference, status } = req.query
        const orderOwner = await getOrderOwner(external_reference)
        const messageData = (status === "approved" && samples.success) ||
            (status === "in_process" && samples.pending) ||
            samples.failure
        sendEmail(orderOwner, messageData)
        // sendWsMessage(orderOwner, messageData)

        return res.json(req.query)
    } catch (error) {
        console.log(error)
        return res.status(404).json({ error: error.message });
    }
}

module.exports = updateOrder