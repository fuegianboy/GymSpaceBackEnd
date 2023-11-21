const sendWsMessageHandler = require("../../handlers/whatsapp/sendWsMessage")

const sendWsMessage = async (req, res) => {

    try {
        const { userPhone: phone, bodyMessage: body } = req.body
        const message = await sendWsMessageHandler({ phone }, { body })
        return res.json(message.sid)
    } catch (error) {
        console.error(error);
        return res.status(404).json({ error: error.message })
    }
}

module.exports = sendWsMessage;