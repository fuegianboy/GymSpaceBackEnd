
/**
 * Parse a given value to Integer or NaN.
 * E.g:
 * "80" -> 80
 * "80a" -> NaN (simple parseInt would give you 80)
 */
function parseIntStrict(number) {
    if (isNaN(number)) return NaN
    return parseInt(number)
}

module.exports = { parseIntStrict }