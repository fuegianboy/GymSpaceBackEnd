const validateItem = require("./validateItem");

const validateItems = async (items) => {

    // Items must be a list

    if (!Array.isArray(items))
        throw new Error("Items must be a list");

    // Items mustn't be empty

    if (!items.length)
        throw new Error("Items list is empty");

    // Validate items

    for (const item of items) {
        await validateItem(item);
    }

}

module.exports = validateItems