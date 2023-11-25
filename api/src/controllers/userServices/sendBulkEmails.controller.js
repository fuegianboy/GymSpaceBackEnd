const { UserServices } = require("../../db")
const sendBulkEmails = require("../../handlers/userServices/sendBulkEmails")
const getUserServicesOptions = require("../../utils/userServices/getUserServicesOptions")
module.exports = async (req, res) => {

    try {
        const messageData = {
            subject: "Your account is about to expire!",
            body: "Don't worry, It's a test email",
            link: "https://gymspace.up.railway.app/",
        }

        const userServicesOptions = getUserServicesOptions(req.query)
        const orders = await UserServices.findAll(userServicesOptions)
        // await sendBulkEmails(orders, messageData)
        return res.json({
            message: "Alerts send succesfully",
            emails: orders.map(order => order.User.email)
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}