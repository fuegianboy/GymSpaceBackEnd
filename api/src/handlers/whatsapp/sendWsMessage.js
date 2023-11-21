const accountSid = process.env.TWILIO_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = require('twilio')(accountSid, authToken);


const sendWsMessage = async (userData, messageData) => {

    const messageInfo = {
        body: messageData.body,
        from: `whatsapp:+${process.env.TWILIO_PHONE_NUMBER}`,
        to: `whatsapp:+${userData.phone}`
    }
    console.log('messageInfo', messageInfo)
    const message = await client.messages.create(messageInfo);

    return message
}

module.exports = sendWsMessage