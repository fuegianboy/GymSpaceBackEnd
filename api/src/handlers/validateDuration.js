const { parseIntStrict } = require("../utils")

/**
 * @param {*} n number or string  
 * @param {*} messageName To create the message in caso of error
 * @returns an object with information
 */
const validatePositiveIntegerHandler = (n, messageName = "Value") => {

    const isValidPositiveInteger = (n) =>
        Number.isInteger(parseIntStrict(n)) &&
        n >= 0

    if (n && !isValidPositiveInteger(n))
        return {
            error: true,
            message: `${messageName} must be a positive integer.`
        }
    return { error: false }
}

module.exports = { validatePositiveIntegerHandler }