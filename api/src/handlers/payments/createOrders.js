const { Products, Users, UserProducts, Services, UserServices } = require("../../db");

module.exports = async (userId, items, external_reference) => {
    for (const item of items) {
        const {
            id,
            currency_id,
            quantity,
        } = item

        const product = await Products.findByPk(item.id)
        const service = product ? null : await Services.findByPk(item.id)

        if (product) {
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
                valuation: 10,
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
                mp_merchant_order_id: null,
                mp_external_reference: external_reference,
            })
        }
        else if (service) {
            const { startDate, finishDate, days_notice, } = item

            // Reduce service seats

            // Create order
            await UserServices.create({
                userID: userId,
                serviceID: id,
                startDate,
                finishDate,
                days_notice,
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
                mp_external_reference: external_reference,
            })
        }
        else {
            throw new Error("Item not found")
        }
    }
}
