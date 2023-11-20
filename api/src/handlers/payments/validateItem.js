const { Products, Services, Users } = require("../../db");
const { isStringLengthInRange, isValidImageUrl, isValidPositiveInteger, isValidPositiveNumber, isValidUUID, validateSimpleDate } = require("../../utils");

const validateItem = async (item) => {
    const {
        id,
        // title,
        // unit_price,
        quantity,
        // picture_url,
        currency_id,
        // description,
        startDate, // For service
        finishDate, // For service
    } = item
    const errors = []

    // Validate title 

    // if (!title) errors.push("Product must have a title");

    // Validate unit_price

    // if (unit_price === undefined)
    //     errors.push("Product must have a unit price");
    // else if (!(isValidPositiveNumber(unit_price) && unit_price > 0))
    //     errors.push("unit_price must be greater than zero");

    // Validate quantity

    if (!isValidPositiveInteger(quantity) || quantity < 1)
        throw new Error("quantity must be a positive integer greater than zero.");

    // Validate picture_url

    // if (!picture_url)
    //     errors.push("Product must have a picture url");
    // else if (!isValidImageUrl(picture_url))
    //     errors.push("picture_url must be in URL format");

    // Validate currency_id if it exist

    if (currency_id && !isStringLengthInRange(currency_id, 3, 3))
        errors.push("currency_id must be a currency code. e.g: 'USD'");

    // Validate description

    // if (!description)
    //     errors.push("Product must have a description");


    // Validate itemId

    if (!isValidUUID(id))
        throw new Error("ItemId must be a valid UUID format")

    // Validate existing item

    const [productFound, serviceFound] = await Promise.all([
        Products.findByPk(id),
        Services.findByPk(id),
    ])

    if (!productFound && !serviceFound)
        throw new Error("item not found")

    // Validate Product

    if (productFound) {

        // Validate product is available for selling

        const productAcceptanceStatusList = [
            "available",
            "disponible"
        ]

        const productStatus = productFound.status.toLowerCase()

        if (!productAcceptanceStatusList.includes(productStatus))
            throw new Error(`Product is not available for selling`)

        // Validate final stock

        const finalStock = productFound.stockNow - quantity

        if (quantity && (finalStock < 0))
            throw new Error(`Insufficient stock`)
    }

    // Validate Service

    else if (serviceFound) {

        // Validate product is available for selling

        const serviceAvailableStatus = [
            "habilitado",
            "available",
            "active",
        ]

        const serviceStatus = serviceFound.status.toLowerCase();

        if (!serviceAvailableStatus.includes(serviceStatus))
            throw new Error(`Service is not available for selling`)

        // Validate sufficient seats

        // Validate startDate

        if (!startDate || !validateSimpleDate(startDate))
            throw new Error(`StartDate is invalid or mising.`)

        // Validate finishDate

        if (!finishDate || !validateSimpleDate(finishDate))
            throw new Error(`FinishDate is invalid or mising.`)

    }

}

module.exports = validateItem