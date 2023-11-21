const { Products, Users, UserProducts } = require("../../db");
const { isValidPositiveInteger, isValidUUID } = require("../../utils");

const createProductOrder = async (userId, item) => {
    const {
        id,
        currency_id,
        quantity,
        external_reference,
    } = item

    const product = await Products.findByPk(id)

    if (!product)
        throw new Error("itemId not found")

    // Reduce product stock

    const finalStock = product.stockNow - quantity

    await product.update({
        stockNow: finalStock >= 0 ? finalStock : product.stockNow,
        status: !finalStock ? "Not available" : product.status,
    })

    // Create order

    await UserProducts.create({
        userID: userId,
        productID: id,
        valuation: "10",
        qty: quantity,
        unitPrice: product.price,
        date: Date.now(),
        status: null,
        state: null,
        picture_url: product.image,
        currency_id,
        description: product.description,
        title: product.name,
        mp_payment_id: null,
        mp_status: "created",
        // mp_merchant_order_id: null,
        mp_merchant_order_id: external_reference, // Test
        external_reference
    })
}

module.exports = createProductOrder