const { Products, Services, Users } = require("../../db");
const validateItems = require("../../handlers/payments/validateItems");
const mp = require("mercadopago");
const { isValidUUID } = require("../../utils");

// MercadoPago configuration

mp.configure({
  access_token: process.env.ACCESS_TOKEN || ""
})

const createOrder = async (req, res) => {

    try {

        const {
            userId,
            items
        } = req.body

        // Validate userId

        if (!isValidUUID(userId)) {
            return res.status(404).json({ error: "userId must be a valid UUID format" });
        }
        else {
            const userFound = await Users.findByPk(userId)

            if (!userFound)
                return res.status(404).json({ error: "User not found" });
        }

        // Validate items

        const validationErrors = await validateItems(items);

        if (validationErrors.length > 0)
            return res.status(404).json({ error: validationErrors });

        // Create preference
        
        const preference = {
            items: [...items],
            back_urls: {
                "success": "http://localhost:3005/payments/success",
                "failure": "http://localhost:3005/failure",
                "pending": "http://localhost:3005/pending"
            },
            auto_return: "approved",
        }

        const data = await mp.preferences.create(preference)

        return res.json(data)
    } catch (error) {
        console.log(error)
        return res.status(404).json({ error: error.message });
    }
}

module.exports = createOrder;