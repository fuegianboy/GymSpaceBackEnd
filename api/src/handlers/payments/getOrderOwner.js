const { UserProducts, UserServices, Users } = require("../../db");

const getOrderOwner = async (external_reference) => {

    const order = await UserProducts.findOne({ where: { external_reference } }) ||
        await UserServices.findOne({ where: { external_reference } })

    return await Users.findByPk(order.userID)
}

module.exports = getOrderOwner