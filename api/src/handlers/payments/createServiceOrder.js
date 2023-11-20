const { Services, UserServices } = require("../../db");

const createUserServiceOrder = async (userID, item) => {

    const {
        id: serviceID,
        currency_id,
        quantity,
        startDate,
        finishDate,
        external_reference: mp_external_reference,
    } = item

    const service = await Services.findByPk(serviceID)

    if (!service)
        throw new Error("Service not found")

    // Reduce service seats

    // Create order
    console.log('item', item)
    await UserServices.create({
        userID,
        serviceID,
        startDate,
        finishDate,
        startTime: service.startTime,
        valuation: 10,
        qty: quantity,
        unitPrice: service.price,
        date: Date.now(),
        status: 'normal',
        picture_url: service.image,
        currency_id,
        description: service.description,
        title: service.name,
        mp_payment_id: null,
        mp_status: "created",
        mp_merchant_order_id: null,
        mp_external_reference
    })
}

module.exports = createUserServiceOrder