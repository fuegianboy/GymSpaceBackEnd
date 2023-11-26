const { Products, Services, Users } = require("../../db");
const validateItems = require("../../handlers/payments/validateItems");
const { isValidUUID } = require("../../utils");
const createProductOrder = require("../../handlers/payments/createProductOrder");
const createServiceOrder = require("../../handlers/payments/createServiceOrder");
const createItems = require("../../handlers/payments/createItems");
const createPreferences = require("../../handlers/payments/createPreferences");

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
        // Create preference
        const back_url = `${req.protocol}://${req.get('host')}/payments/update`
        const mpResponse = await createPreferences(preferenceItems, external_reference, back_url)
        return res.json(mpResponse)
    } catch (error) {
        console.log(error)
        return res.status(404).json({ error: error.message });
    }
}

module.exports = createOrder;