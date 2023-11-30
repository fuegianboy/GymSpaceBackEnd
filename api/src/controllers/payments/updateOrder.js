const { UserProducts, UserServices, Users } = require("../../db");
const updateOrderHandler = require("../../handlers/payments/updateOrder")
const samples = require("../../utils/mails/samples");
const getOrderOwner = require("../../handlers/payments/getOrderOwner");
const sendEmail = require("../../handlers/mailer/sendEmail");

const updateOrder = async (req, res) => {
    try {
        // Update orders
        await updateOrderHandler(req.query)

        // Get user data
        const { external_reference, status } = req.query
        const user = await getOrderOwner(external_reference)

        // Send email notification
        const messageData = (status === "approved" && samples.success) ||
            (status === "in_process" && samples.pending) || samples.failure
        sendEmail(user, messageData)

        console.log(req.query)
    } catch (error) {
        console.log(error)
    } finally {
        return res.redirect(`${req.protocol}://${req.get('host')}/`)
    }
}

module.exports = updateOrder