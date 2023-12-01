const axios = require("axios").default

const getResponse = async (req, res) => {

    const options = {
        method: 'POST',
        url: "https://api.openai.com/v1/chat/completions",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.CHATBOT_API_KEY}`
        },
        data: req.body
    }
    try {
        const { data } = await axios.request(options)
        return res.status(200).json(data)
    } catch (error) {
        console.log(error, error.response?.data)
        return res.status(500).json({ error: error.message })
    }
}

module.exports = getResponse;