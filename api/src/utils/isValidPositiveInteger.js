
/**
 * @param {*} number number or string  
 */
const isValidPositiveInteger = (number) => {
    return Number.isInteger(number) &&
        !isNaN(Number(number)) &&
        number >= 0
}
module.exports = { isValidPositiveInteger }