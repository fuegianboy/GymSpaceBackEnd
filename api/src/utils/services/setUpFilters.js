const { Op } = require("sequelize");
const { minValidHourMinuteFormat, isValidHourMinuteFormat } = require("../isValidHourMinuteFormat");
const { isValidPositiveInteger } = require("../isValidPositiveInteger");


module.exports = (filters) => {

    const servicesOptions = {}
    const {
        name,
        category,
        status,
        coachId,
        areaId,
        startTime, endTime,
        startDuration, endDuration,
        minCapacity, maxCapacity,
    } = filters;

    // Validations

    if (startTime && !isValidHourMinuteFormat(startTime))
        throw new Error("Invalid startTime format hour:minute (00:00).")

    if (endTime && !isValidHourMinuteFormat(endTime))
        throw new Error("Invalid endTime format hour:minute (00:00).")

    if (startDuration && isValidPositiveInteger(startDuration))
        throw new Error(`startDuration must be a positive number.`)

    if (endDuration && isValidPositiveInteger(endDuration))
        throw new Error(`endDuration must be a positive number.`)

    if (minCapacity && isValidPositiveInteger(minCapacity))
        throw new Error(`minCapacity must be a positive number.`)

    if (maxCapacity && isValidPositiveInteger(maxCapacity))
        throw new Error(`maxCapacity must be a positive number.`)

    // Set up filters

    if (name) servicesOptions["name"] = { [Op.iLike]: "%" + name.trim() + "%" }
    if (category) servicesOptions["category"] = { [Op.iLike]: "%" + category.trim() + "%" }
    if (status) servicesOptions["status"] = { [Op.iLike]: "%" + status.trim() + "%" }
    if (coachId) servicesOptions["coachID"] = { [Op.iLike]: `%${coachId.trim()}%` }
    if (areaId) servicesOptions["areaID"] = { [Op.iLike]: `%${areaId.trim()}%` }

    if (startTime && endTime)
        servicesOptions["startTime"] = { [Op.between]: [startTime, endTime] }
    else if (startTime) servicesOptions["startTime"] = { [Op.gte]: startTime }
    else if (endTime) servicesOptions["startTime"] = { [Op.lte]: endTime }

    if (startDuration && endDuration)
        servicesOptions["duration"] = { [Op.between]: [startDuration, endDuration] }
    else if (startDuration) servicesOptions["duration"] = { [Op.gte]: startDuration }
    else if (endDuration) servicesOptions["duration"] = { [Op.lte]: endDuration }

    if (minCapacity && maxCapacity)
        servicesOptions["capacity"] = { [Op.between]: [minCapacity, maxCapacity] }
    else if (minCapacity) servicesOptions["capacity"] = { [Op.gte]: minCapacity }
    else if (maxCapacity) servicesOptions["capacity"] = { [Op.lte]: maxCapacity }

    return servicesOptions
}