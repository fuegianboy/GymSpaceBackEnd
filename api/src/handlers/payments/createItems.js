const { v4: uuidv4 } = require('uuid');
const { Products, Services } = require("../../db");

const createItems = async (items) => {

    const preferenceItems = []
    const external_reference = uuidv4()

    for (const item of items) {
        const {
            id,
            currency_id,
            quantity,
            startDate, // For service
            finishDate, // For service
        } = item

        const itemFound = await Products.findByPk(id) || await Services.findByPk(id)

        preferenceItems.push({
            id,
            category_id: itemFound.category,
            currency_id: currency_id || "ARS",
            description: itemFound.description,
            picture_url: itemFound.image,
            title: itemFound.name,
            quantity,
            unit_price: itemFound.price,
            external_reference,
            startDate, // For service
            finishDate, // For service
        })
    }

    return [preferenceItems, external_reference]
}

module.exports = createItems