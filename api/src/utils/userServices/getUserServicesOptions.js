const { Users, Services, Reviews } = require('../../db');
const { Op } = require("sequelize")
const setUsersFilters = require("../users/setFilters")
const setUpServicesFilters = require("../services/setUpFilters")
const { conn } = require("../../db")

module.exports = (filters) => {
    let userServicesOptions = {}
    const {
        startDate, finishDate,
        startDateAfter, startDateBefore,
        finishDateAfter, finishDateBefore,
        userId,
        serviceId,
        external_reference,
        sql
    } = filters

    if (startDate) userServicesOptions["startDate"] = { [Op.eq]: startDate }
    if (finishDate) userServicesOptions["finishDate"] = { [Op.eq]: finishDate }
    /**
     * Los filtros "After" y "Before" permiten filtrar fechas para un rango dado. 
     */
    if (startDateAfter) userServicesOptions["startDate"] = { [Op.gte]: startDateAfter }
    if (startDateBefore) userServicesOptions["startDate"] = { [Op.lte]: startDateBefore }
    if (finishDateAfter) userServicesOptions["finishDate"] = { [Op.gte]: finishDateAfter }
    if (finishDateBefore) userServicesOptions["finishDate"] = { [Op.lte]: finishDateBefore }

    if (userId) userServicesOptions["userID"] = { [Op.eq]: userId }
    if (serviceId) userServicesOptions["serviceID"] = { [Op.eq]: serviceId }

    if (external_reference)
        userServicesOptions["mp_external_reference"] = { [Op.eq]: external_reference }

    if (sql) userServicesOptions = conn.literal(sql)
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
        where: userServicesOptions,
        include: [
            {
                model: Users,
                where: setUsersFilters(userFilters),
                attributes: [
                    'userID',
                    'firstName',
                    'lastName',
                    'email',
                ],
            },
            {
                model: Services,
                where: setUpServicesFilters(serviceFilters),
                attributes: [
                    'serviceID',
                    'name',
                    'description',
                    "startTime",
                    "status",
                    "coachID",
                    "image",
                ],
            },
            {
                model: Reviews, 
                attributes: [
                    'reviewID',
                    // 'rating',
                    'comment',
                    'display',
                ],
            },
        ],
    }
}