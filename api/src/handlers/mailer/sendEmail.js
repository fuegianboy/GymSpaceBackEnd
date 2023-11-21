const nodemailer = require("nodemailer")
const messageTemplate = require("../../utils/mails/message");

const sendEmail = async (userData, messageData) => {

    // Prepare message

    const { firstName, lastName, email, } = userData
    const { subject, body, link } = messageData
    const html = messageTemplate(firstName, lastName, body, link)

    // Create transport config

    const config = {
        host: "smtp-relay.brevo.com",
        port: 2525,
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
        tls: { rejectUnauthorized: false },
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
    return await transport.sendMail(message)
}

module.exports = sendEmail