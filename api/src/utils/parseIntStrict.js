
/**
 * Parse a given value to Integer or NaN.
 * E.g:
 * "80" -> 80
 * "80a" -> NaN (simple parseInt would give you 80)
 */
function parseIntStrict(n) {
    if (isNaN(n)) return NaN
    return parseInt(n)
}

module.exports = { parseIntStrict }