require('dotenv').config();
const sendEmail = require('../../handlers/mailer/sendEmail');

const mailTo = async (req, res) => {

  try {

    const {
      firstName,
      lastName,
      email,
      subject,
      html,
      link,
    } = req.body

    if (!firstName || !lastName || !email || !subject || !html || !link) {
      return res.status(404).json("Incomplete data")
    }

    const userData = { firstName, lastName, email }
    const messageData = { subject, body: html, link }
    const info = await sendEmail(userData, messageData)
    
    console.error(info)
    res.status(200).send("Email successfully sent");

  } catch (error) {

    console.error(error)
    res.status(400).send("Failed to send email")

  }

}
module.exports = mailTo