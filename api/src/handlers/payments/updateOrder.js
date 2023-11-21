const { UserProducts, UserServices } = require("../../db");

const updateOrder = async (data) => {
    const {
        external_reference: mp_external_reference,
        payment_id: mp_payment_id,
        status: mp_status,
        merchant_order_id: mp_merchant_order_id,
    } = data

    // Update UserProducts
    await UserProducts.update(
        {
            mp_payment_id,
            mp_status,
            mp_merchant_order_id,
        },
        {
            where: { mp_external_reference }
        }
    )

    // Update UserServices

    await UserServices.update(
        {
            mp_payment_id,
            mp_status,
            mp_merchant_order_id,
        },
        {
            where: { mp_external_reference }
        }
    )
}

module.exports = updateOrder