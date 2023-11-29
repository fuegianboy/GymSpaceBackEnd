const { UserProducts, UserServices, Users } = require("../../db");

const getOrderOwner = async (mp_external_reference) => {

    const someOrder = await UserProducts.findOne({
        where: { mp_external_reference }
    }) || await UserServices.findOne({
        where: { mp_external_reference }
    })

    return await Users.findByPk(someOrder.userID)
}

module.exports = getOrderOwner