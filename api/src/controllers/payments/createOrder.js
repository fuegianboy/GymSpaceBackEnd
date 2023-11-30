const { Products, Services, Users } = require("../../db");
const validateItems = require("../../handlers/payments/validateItems");
const { isValidUUID } = require("../../utils");
const createPreferences = require("../../handlers/payments/createPreferences");
const createOrders = require("../../handlers/payments/createOrders");

module.exports = async (req, res) => {

    try {

        const {
            userId,
            items,
            redirectPayment
        } = req.body

        // Validate userId

        if (!isValidUUID(userId))
            return res.status(404).json({ error: "userId must be a valid UUID format" });

        const userFound = await Users.findByPk(userId)

        if (!userFound)
            return res.status(404).json({ error: "User not found" });

        if (userFound.status !== "active")
            return res.status(404).json({ error: "User is not active" });

        await validateItems(items);
        const { mpResponse, external_reference } = await createPreferences(req, items)

        if (!mpResponse)
            return res.status(500).json("MecardoPago fail to create payment link.")

        await createOrders(userId, items, external_reference)
        if (redirectPayment) res.redirect(mpResponse.response.init_point)
        return res.json(mpResponse)
    } catch (error) {
        console.log(error)
        return res.status(404).json({ error: error.message });
    }
}
