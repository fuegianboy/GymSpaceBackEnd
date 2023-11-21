
/**
 * @param {*} number number or string  
 */
const isValidPositiveNumber = (number) => {
    return !isNaN(Number(number)) && number >= 0
}
module.exports = { isValidPositiveNumber }