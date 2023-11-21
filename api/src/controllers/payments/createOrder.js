const { Products, Services, Users } = require("../../db");
const validateItems = require("../../handlers/payments/validateItems");
const mp = require("mercadopago");
const { isValidUUID } = require("../../utils");
const createProductOrder = require("../../handlers/payments/createProductOrder");
const createServiceOrder = require("../../handlers/payments/createServiceOrder");
const createItems = require("../../handlers/payments/createItems");

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

        if (!isValidUUID(userId))
            return res.status(404).json({ error: "userId must be a valid UUID format" });

        const userFound = await Users.findByPk(userId)

        if (!userFound)
            return res.status(404).json({ error: "User not found" });

        if (userFound.status !== "active")
            return res.status(404).json({ error: "User is not active" });

        // Validate items

        await validateItems(items);

        // Create items

        const [preferenceItems, external_reference] = await createItems(items)

        // Create order

        for (const item of preferenceItems) {
            const productFound = await Products.findByPk(item.id)
            productFound ? await createProductOrder(userId, item) :
                await createServiceOrder(userId, item)
        }

        // Create back_urls

        const back_url = `${req.protocol}://${req.get('host')}`
        const success = `${back_url}/payments/update`
        const failure = `${back_url}/payments/update`
        const pending = `${back_url}/payments/update`

        // Create preference

        const preference = {
            external_reference,
            items: preferenceItems,
            back_urls: {
                success,
                failure,
                pending,
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