const axios = require("axios").default

const getResponse = async (req, res) => {

    const systemMessage = {
        role: "system",
        content: "Explain all concepts like I am 10 years old"
    }
    const options = {
        method: 'POST',
        url: "https://api.openai.com/v1/chat/completions",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.CHATBOT_API_KEY}`
        },
        data: {
            "model": "gpt-3.5-turbo-1106",
            "messages": [systemMessage, ...req.body.messages],
            "max_tokens": 1200,
            "temperature": 0.2,
            "n": 1
        }
    }
    try {
        const { data } = await axios.request(options)
        return res.status(200).json(data)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
}

module.exports = getResponse;