/**
 * Checks if a string length falls within a specified range.
 * @param {string} string - The string to test.
 * @param {number} minLength - The minimum length allowed.
 * @param {number} maxLength - The maximum length allowed.
 * @returns {boolean} - True if the string length is within the range, otherwise false.
 */
function isStringLengthInRange(string, minLength = 0, maxLength = Number.POSITIVE_INFINITY) {
    const length = string.length;
    return length >= minLength && length <= maxLength;
}

module.exports = { isStringLengthInRange }