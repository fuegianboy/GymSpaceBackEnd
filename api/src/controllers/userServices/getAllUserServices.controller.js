const { Op } = require('sequelize');
const { Users, Services, UserServices } = require('../../db');

const getAllUserServices = async (req, res) => {
  try {


    const { filters } = req.body;

    const queryOptions = {
      where: {},
      include: [
        {
          model: Users,
          attributes: ['userID', 'firstName', 'lastName','email'], 
          where: {}, 
        },
        {
          model: Services,
          attributes: ['serviceID', 'name', 'description', "startTime","status", "coachID"],
          where: {}, 
        },
      ],
      order: [],
    }

    if(filters) {

      if (filters.startDate_filter) {
        queryOptions.where.startDate = {
          [Op.eq]: filters.startDate_filter,
        };
      }

      if (filters.userID_filter) {
        queryOptions.where.userID = {
          [Op.eq]: filters.userID_filter,
        };
      }

      if (filters.serviceID_filter) {
        queryOptions.where.serviceID = {
          [Op.eq]: filters.serviceID_filter,
        };
      }

      if (filters.User_firstName_filter) {
        queryOptions.include[0].where.firstName = {
          [Op.eq]: filters.User_firstName_filter,
        };
      }

      if (filters.Service_name_filter) {
        queryOptions.include[1].where.name = {
          [Op.eq]: filters.Service_name_filter,
        };
      }

      if (filters.startDate_order) {
        queryOptions.order.push(['startDate', filters.startDate_order.toUpperCase()]);
      }

      if (filters.valuation_order) {
        queryOptions.order.push(['valuation', filters.valuation_order.toUpperCase()]);
      }

    }

    const result = await UserServices.findAll(queryOptions)
    return res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving UserServices records', error: error.message });
  }
}

module.exports = getAllUserServices;



