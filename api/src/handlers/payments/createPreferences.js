const mp = require("mercadopago");

mp.configure({
    access_token: process.env.ACCESS_TOKEN || ""
})

module.exports = async (items, external_reference, back_url) => {

    const preference = {
        external_reference,
        items,
        back_urls: {
            success: back_url,
            failure: back_url,
            pending: back_url,
        },
        auto_return: "approved",
    }

    return await mp.preferences.create(preference)
}