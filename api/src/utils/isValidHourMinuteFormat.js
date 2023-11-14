/**
 * Checks if the input string adheres to the "hour:minute" format like "00:00".
 */
const isValidHourMinuteFormat = (value) => /^(0\d|1\d|2[0-3]):[0-5]\d$/.test(value)

module.exports = { isValidHourMinuteFormat }