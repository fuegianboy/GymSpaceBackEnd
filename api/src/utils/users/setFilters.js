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

    /**
     * Los filtros startDate y endDate limitan y filtran usuarios por el enrollmentDate
     */
    if (startDate && endDate)
        filters["enrollmentDate"] = { [Op.between]: [startDate, endDate] }
    else if (startDate) filters["enrollmentDate"] = { [Op.gte]: startDate }
    else if (endDate) filters["enrollmentDate"] = { [Op.lte]: endDate }


    return filters
}