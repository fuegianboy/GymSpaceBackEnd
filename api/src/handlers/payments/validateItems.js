const validateItem = require("./validateItem");

const validateItems = async (items) => {
    const errors = [];

    if (!Array.isArray(items)) {
        errors.push("Items must be a list");
    } else {
        if (!items.length) {
            errors.push("Items must have at least one product");
        } else {
            for (const item of items) {

                const itemErrors = await validateItem(item);

                if (itemErrors.length > 0) {
                    errors.push({
                        itemId: item.itemId || null,
                        errors: itemErrors
                    });
                }
            }
        }
    }

    return errors;
}

module.exports = validateItems