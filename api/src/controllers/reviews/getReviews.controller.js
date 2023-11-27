const { Op } = require('sequelize');
const { Reviews, UserServices } = require('../../db');

const getReviews = async (req, res) => {
  try {
    const { filters } = req.body;

    const queryOptions = {
      where: {},
      include: [
        {
          model: Reviews,
          attributes: ['reviewID', 'userServicesID', 'comment', 'display'],
          where: {},
        },
      ],
      order: [],
    };

    if (filters) {
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

      if (filters.startTime_filter) {
        queryOptions.where.startTime = {
          [Op.like]: `%${filters.Product_name_filter}%`,
        };
      }

      if (filters.Review_display_filter) {
        queryOptions.include[0].where.display = {
          [Op.like]: `%${filters.Review_display_filter}%`,
        };
      }

    
    }

    const result = await UserServices.findAll(queryOptions);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving Reviews records', error: error.message });
  }
};

module.exports = getReviews
