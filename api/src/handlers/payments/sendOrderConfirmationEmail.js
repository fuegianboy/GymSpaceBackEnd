const getOrderOwner = require("./getOrderOwner")
const nodemailer = require("nodemailer")
const messageTemplate = require("../../mailer/message");

const sendOrderConfirmationEmail = async (external_reference) => {

    // Get user data

    const {
        firstName,
        lastName,
        email,
    } = await getOrderOwner(external_reference)

    // Prepare message

    const subject = "Confirmación: ¡Tu orden en GymSpace ha sido aprobada!"
    const bodyMessage = `
    ¡Excelentes noticias! Tu orden ha sido aprobada y está en proceso de preparación. Si necesitas más detalles sobre las clases o los productos, estamos aquí para ayudarte. Gracias por confiar en GymSpace para tus necesidades fitness, ¡esperamos que disfrutes al máximo de todo lo que ofrecemos!

    Saludos,
    Equipo GymSpace
    `
    const link = "https://gymspace.up.railway.app/"
    const html = messageTemplate(firstName, lastName, bodyMessage, link)

    // Create transport config

    const config = {
        host: "smtp-relay.brevo.com",
        port: 2525,
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        }
    }

    // Create message

    const message = {
        from: "helpdesk@gymspace.com",
        to: email,
        subject,
        html
    }

    // Send email

    const transport = nodemailer.createTransport(config)
    await transport.sendMail(message)
}

module.exports = sendOrderConfirmationEmail