const { Op } = require("sequelize")
const setUsersFilters = require("../users/setFilters")
const setUpServicesFilters = require("../services/setUpFilters")

module.exports = (filters) => {
    let userServicesOptions = {}
    const {
        startDate, finishDate,
        userId,
        serviceId,
    } = filters

    /**
     * Este filtro permite incluir aquellas ordenes que su fecha de inicio y fin se encuentra entre startDate y finishDate. 
     */
    if (startDate) userServicesOptions["startDate"] = { [Op.gte]: startDate }
    if (finishDate) userServicesOptions["finishDate"] = { [Op.lte]: finishDate }

    if (userId) userServicesOptions["userID"] = { [Op.eq]: userId }
    if (serviceId) userServicesOptions["serviceID"] = { [Op.eq]: serviceId }

    /**
     * Reutilizo el handler setFilters de users y services para obtener filtros adiconales por usuario o servicio.
     */
    const userFilters = {
        fname: filters.userFirstName,
        lname: filters.userLastName,
        email: filters.userEmail,
        gender: filters.userGender,
        status: filters.userStatus,
        systemRole: filters.userSystemRole,
        startDate: filters.userStartDate,
        endDate: filters.userEndDate,
    }

    const serviceFilters = {
        name: filters.serviceName,
        category: filters.serviceCategory,
        status: filters.serviceStatus,
        coachId: filters.serviceCoachId,
        areaId: filters.serviceAreaId,
        startTime: filters.serviceStartTime,
        endTime: filters.serviceEndTime,
        startDuration: filters.serviceStartDuration,
        endDuration: filters.serviceEndDuration,
        minCapacity: filters.serviceMinCapacity,
        maxCapacity: filters.serviceMaxCapacity,
    }

    return {
        userServicesOptions,
        userOptions: setUsersFilters(userFilters),
        servicesOptions: setUpServicesFilters(serviceFilters),
    }
}