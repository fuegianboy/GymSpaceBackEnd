const { UserProducts, UserServices, Users } = require("../../db");
const getOrderOwner = require("../../handlers/payments/getOrderOwner");

const updateOrder = async (req, res) => {
    try {
        const { external_reference } = req.params
        const user = await getOrderOwner(external_reference)
        return res.json(user)
    } catch (error) {
        console.log(error)
        return res.status(404).json({ error: error.message });
    }
}
module.exports = updateOrder