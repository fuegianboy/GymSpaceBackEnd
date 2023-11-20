const getOrderOwner = require("./getOrderOwner")
const nodemailer = require("nodemailer")
const messageTemplate = require("../../mailer/message");

const sendOrderConfirmationEmail = async (external_reference, messageData) => {

    // Get user data

    const {
        firstName,
        lastName,
        email,
    } = await getOrderOwner(external_reference)

    // Prepare message

    const { subject, body } = messageData
    const link = "https://gymspace.up.railway.app/"
    const html = messageTemplate(firstName, lastName, body, link)

    // Create transport config

    const {
        MAIL_USER,
        MAIL_PASS,
    } = process.env

    const config = {
        host: "smtp-relay.brevo.com",
        port: 2525,
        secure: false,
        auth: {
            user: MAIL_USER,
            pass: MAIL_PASS,
        }
    }

    // Create message

    const message = {
        from: `GymSpace helpdesk@gymspace.com`,
        to: email,
        subject,
        html
    }

    // Send email

    const transport = nodemailer.createTransport(config)
    await transport.sendMail(message)
}

module.exports = sendOrderConfirmationEmail