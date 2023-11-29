const { v4: uuidv4 } = require('uuid');
const { Products, Services } = require("../../db");
const mp = require("mercadopago");

mp.configure({
    access_token: process.env.ACCESS_TOKEN || ""
})
/**
 * Create preferences
 * Se integra con MercadoPago para obtener el link de pago.
 * También la función genera un external_reference, este es un id único que nos servira para crear las ordenes en la bases de datos y asociarlas cómo una única transacción.
*/
module.exports = async (req, items) => {

    const preferenceItems = []
    const external_reference = uuidv4()

    for (const item of items) {

        const { id, quantity } = item
        const itemFound = await Products.findByPk(id) || await Services.findByPk(id)

        preferenceItems.push({
            title: itemFound.name,
            unit_price: itemFound.price,
            quantity,
            currency_id: "PEN",
            category_id: itemFound.category,
            description: itemFound.description,
            picture_url: itemFound.image,
        })
    }

    const preference = {
        items: preferenceItems,
        back_urls: {
            success: `${req.protocol}://${req.get('host')}/payments/update`,
            failure: `${req.protocol}://${req.get('host')}/payments/update`,
            pending: `${req.protocol}://${req.get('host')}/payments/update`,
        },
        auto_return: "approved",
        external_reference,
    }

    const mpResponse = await mp.preferences.create(preference)
    return { mpResponse, external_reference }
}