/**
 * Regular expression for a phone number with at least 8 digits
 */
const isValidPhoneNumber = (phone) => /^\d{8,}$/.test(phone)

module.exports = { isValidPhoneNumber }