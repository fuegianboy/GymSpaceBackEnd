const { Products, Services, Users } = require("../../db");
const { isStringLengthInRange, isValidImageUrl, isValidPositiveInteger, isValidPositiveNumber, isValidUUID } = require("../../utils");
const mp = require("mercadopago")
mp.configure({
  access_token: process.env.ACCESS_TOKEN || ""
})

const createOrder = async (req, res) => {

    try {

        const {
            userId,
            items
        } = req.body

        // Validate userId

        if (!isValidUUID(userId)) {
            return res.status(404).json({ error: "userId must be a valid UUID format" });
        }
        else {
            const userFound = await Users.findByPk(userId)

            if (!userFound)
                return res.status(404).json({ error: "User not found" });
        }

        // Validate product

        const validateProduct = async (product) => {
            const {
                itemId,
                title,
                unit_price,
                quantity,
                picture_url,
                currency_id,
                description,
            } = product
            const errors = []

            // Validate itemId

            if (!isValidUUID(itemId))
                errors.push("ItemId must be a valid UUID format")
            else {
                const productFound = await Products.findByPk(itemId)
                const serviceFound = await Services.findByPk(itemId)

                if (!productFound && !serviceFound) {
                    errors.push("Item must have a valid Id")
                }
            }

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

            return errors;
        }

        // Validate items

        const validateItems = async (items) => {
            const errors = [];

            if (!Array.isArray(items)) {
                errors.push("Items must be a list");
            } else {
                if (!items.length) {
                    errors.push("Items must have at least one product");
                } else {
                    for (const product of items) {
                        const productErrors = await validateProduct(product);

                        if (productErrors.length > 0) {
                            errors.push({
                                itemId: product.itemId || null,
                                errors: productErrors
                            });
                        }
                    }
                }
            }

            return errors;
        };



        // Validate items

        const validationErrors = await validateItems(items);

        if (validationErrors.length > 0)
            return res.status(404).json({ errors: validationErrors });

        const preference = {
            items: [...items],
            back_urls: {
                "success": "http://localhost:3005/payments/success",
                "failure": "http://localhost:3005/failure",
                "pending": "http://localhost:3005/pending"
            },
            auto_return: "approved",
        }

        const { response } = await mp.preferences.create(preference)
        return res.json(response)
    } catch (error) {
        console.log(error)
        return res.status(404).json({ error: error.message });
    }
}

module.exports = createOrder;