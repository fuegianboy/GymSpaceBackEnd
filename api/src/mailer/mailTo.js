require('dotenv').config();
const nodemailer = require("nodemailer")
const { MAIL_USER, MAIL_PASS } = process.env;
const messageTemplate = require("./messaje");

const mailTo = async (req, res) =>{

  try {
    
    const {
      firstName,
      lastName,
      email,
      subject,
      html,
      link,
    } = req.body

    if (!firstName || !lastName || !email || !subject || !html || !link ) {
      return res.status(404).json("Incomplete data")
    }
    
    const messagehtml = messageTemplate(firstName, lastName, html, link)
    
    const config = {
        host: "smtp-relay.brevo.com",
        port: 2525,
        secure: false,
        auth: {
            user: MAIL_USER,
            pass: MAIL_PASS, 
          }
    }

    const message = {
        from: "helpdesk@gymspace.com",
        to: email,
        subject: subject,
        html: messagehtml 
    }

    const transport = nodemailer.createTransport(config)
      
    const info = await transport.sendMail(message)

    res.status(200).send("Email successfully sent");
      
  } catch (error) {
      
    res.status(400).send("Failed to send email")
    console.error(error)
    
  }

}
module.exports = mailTo