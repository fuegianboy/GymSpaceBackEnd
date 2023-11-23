const { Users, Services } = require('../../db');
const userSetUpSorting = require("../users/setUpSorting")
const serviceSetUpSorting = require("../services/setUpSorting")

module.exports = (conditions) => {

    const {
        sort_startDate, sort_finishDate,
        sort_userId,
        sort_serviceId,
        sort_valuation,
    } = conditions

    let userServiceOrder = []

    const addOrder = (field, direction) => {
        const directions = ["ASC", "DESC"]
        if (directions.includes(direction)) {
            userServiceOrder.push([field, direction]);
        }
    }

    addOrder("startDate", sort_startDate?.trim().toUpperCase());
    addOrder("finishDate", sort_finishDate?.trim().toUpperCase());
    addOrder("userID", sort_userId?.trim().toUpperCase());
    addOrder("serviceID", sort_serviceId?.trim().toUpperCase());
    addOrder("valuation", sort_valuation?.trim().toUpperCase());

    const userOrderConditions = {
        sort_fname: conditions.sort_userFirstName,
        sort_lname: conditions.sort_userLastName,
        sort_status: conditions.sort_userStatus,
        sort_systemRole: conditions.sort_userSystemRole,
        sort_enrollmentDate: conditions.sort_userEnrollmentDate,
    }

    const serviceOrderConditions = {
        sort_name: conditions.sort_serviceName,
        sort_category: conditions.sort_serviceCategory,
        sort_price: conditions.sort_servicePrice,
        sort_startTime: conditions.sort_serviceStartTime,
        sort_duration: conditions.sort_serviceDuration,
        sort_status: conditions.sort_serviceStatus,
        sort_coachId: conditions.sort_serviceCoachId,
        sort_capacity: conditions.sort_serviceCapacity,
        sort_areaId: conditions.sort_serviceAreaId,
    }

    const usersOrder = userSetUpSorting(userOrderConditions).map(order => [Users, ...order])
    const servicesOrder = serviceSetUpSorting(serviceOrderConditions).map(order => [Services, ...order])
    return [...userServiceOrder, ...usersOrder, ...servicesOrder]
}