const sendEmail = require("../mailer/sendEmail")

module.exports = async (orders, messageData) => {

    orders.forEach(async (order) => {
        const userData = {
            firstName: order.User.firstName,
            lastName: order.User.lastName,
            email: order.User.email,
        }
        // console.log(userData);
        await sendEmail(userData, messageData)
    });
}