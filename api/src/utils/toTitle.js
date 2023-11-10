/**
 * Convert string to Title Case.
 * E.g. john becomes John
 */
const toTitle = (str) => str.charAt(0).toUpperCase() + str.slice(1);

module.exports = { toTitle }