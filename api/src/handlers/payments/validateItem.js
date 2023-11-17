const { Products, Services, Users } = require("../../db");
const { isStringLengthInRange, isValidImageUrl, isValidPositiveInteger, isValidPositiveNumber, isValidUUID } = require("../../utils");

const validateItem = async (item) => {
    const {
        itemId,
        title,
        unit_price,
        quantity,
        picture_url,
        currency_id,
        description,
    } = item
    const errors = []

    // Validate title 

    if (!title) errors.push("Product must have a title");

    // Validate unit_price

    if (unit_price === undefined)
        errors.push("Product must have a unit price");
    else if (!(isValidPositiveNumber(unit_price) && unit_price > 0))
        errors.push("unit_price must be greater than zero");

    // Validate quantity

    if (quantity === undefined)
        errors.push("Product must have a quantity");
    else if (!(isValidPositiveInteger(quantity) && quantity > 0))
        errors.push("quantity must be an integer greater than zero");

    // Validate picture_url

    if (!picture_url)
        errors.push("Product must have a picture url");
    else if (!isValidImageUrl(picture_url))
        errors.push("picture_url must be in URL format");

    // Validate currency_id

    if (!currency_id || !isStringLengthInRange(currency_id, 3, 3))
        errors.push("currency_id must be a currency code string like 'USD'");

    // Validate description

    if (!description)
        errors.push("Product must have a description");


    // Validate itemId

    if (!isValidUUID(itemId))
        errors.push("ItemId must be a valid UUID format")
    else {
        const [productFound, serviceFound] = await Promise.all([
            Products.findByPk(itemId),
            Services.findByPk(itemId),
        ])

        if (!productFound && !serviceFound) {
            errors.push("itemId not found")
        }

        // Validate Business Logic

        if (productFound) {
            if (quantity && (productFound.stockNow - quantity < 0))
                errors.push(`Insufficient stock`)

            if (productFound.status !== "available")
                errors.push(`Product status not available`)
        }
        else if (serviceFound) {
            if (quantity && quantity > 1)
                errors.push(`You cannot buy the same service more than once.`)

            if (quantity && (serviceFound.capacity - quantity < 0))
                errors.push(`Insufficient service capacity`)

            if (serviceFound.status !== "Active")
                errors.push(`Service status not active`)
        }
    }

    return errors;
}

module.exports = validateItem