/**
 * Regular expression for basic email validation
 */
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

module.exports = { isValidEmail }