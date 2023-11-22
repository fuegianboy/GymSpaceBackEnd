const { Op } = require("sequelize")
const { validateSimpleDate } = require("../validateSimpleDate")

module.exports = (userFilters) => {

    let filters = {}
    const {
        fname,
        lname,
        email,
        gender,
        status,
        systemRole,
        startDate, endDate,
    } = userFilters

    if (startDate && !validateSimpleDate(startDate))
        throw new Error(`Invalid format ${startDate}`)

    if (endDate && !validateSimpleDate(endDate))
        throw new Error(`Invalid format ${endDate}`)

    if (fname) filters["firstName"] = { [Op.iLike]: "%" + fname.toLowerCase().trim() + "%" }
    if (lname) filters["lastName"] = { [Op.iLike]: "%" + lname.toLowerCase().trim() + "%" }
    if (email) filters["email"] = { [Op.iLike]: "%" + email.toLowerCase().trim() + "%" }
    if (gender) filters["gender"] = { [Op.iLike]: "%" + gender.toLowerCase().trim() + "%" }
    if (status) filters["status"] = { [Op.iLike]: "%" + status.toLowerCase().trim() + "%" }
    if (systemRole) filters["systemRole"] = { [Op.iLike]: "%" + systemRole.toLowerCase().trim() + "%" }
    if (startDate || endDate) {
        if (!endDate) filters["enrollmentDate"] = { [Op.gte]: startDate }
        else if (!startDate) filters["enrollmentDate"] = { [Op.lte]: endDate }
        else filters["enrollmentDate"] = { [Op.between]: [startDate, endDate] }
    }

    return filters
}