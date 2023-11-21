/**
 * Combining and exporting utility functions from separate files
 */
module.exports = {
    ...require("../utils/toTitle"),
    ...require("../utils/validateSimpleDate"),
    ...require("../utils/isValidEmail"),
    ...require("../utils/isValidPhoneNumber"),
    ...require("../utils/isValidHourMinuteFormat"),
    ...require("../utils/isValidUUID"),
    ...require("../utils/isValidImageUrl"),
    ...require("../utils/parseIntStrict"),
    ...require("../utils/isStringLengthInRange"),
    ...require("../utils/isValidPositiveInteger"),
    ...require("../utils/isValidPositiveNumber"),
}