/**
 * Combining and exporting utility functions from separate files
 */
module.exports = {
    ...require("../utils/toTitle"),
    ...require("../utils/validateSimpleDate"),
    ...require("../utils/isValidEmail"),
    ...require("../utils/isValidPhoneNumber"),
    ...require("../utils/isValidHourMinuteFormat"),
}