const { Op } = require('sequelize');
const { Users, Products, UserProducts } = require('../../db');

const getAllUserProducts = async (req, res) => {
  try {
    const { filters } = req.body;

    const queryOptions = {
      where: {},
      include: [
        {
          model: Users,
          attributes: ['userID', 'firstName', 'lastName', 'email'],
          where: {},
        },
        {
          model: Products,
          attributes: ['productID', 'name', 'category', 'price', 'status'],
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

      if (filters.productID_filter) {
        queryOptions.where.productID = {
          [Op.eq]: filters.productID_filter,
        };
      }

      if (filters.external_reference_filter) {
        queryOptions.where.mp_external_reference = {
          [Op.eq]: filters.external_reference_filter,
        };
      }

      if (filters.User_lastName_filter) {
        queryOptions.include[0].where.lastName = {
          [Op.like]: `%${filters.User_lastName_filter}%`,
        };
      }

      if (filters.Product_name_filter) {
        queryOptions.include[1].where.name = {
          [Op.like]: `%${filters.Product_name_filter}%`,
        };
      }

      if (filters.valuation_order) {
        queryOptions.order.push(['valuation', filters.valuation_order.toUpperCase()]);
      }

      if (filters.date_order) {
        queryOptions.order.push(['date', filters.date_order]);
      }

      if (filters.Products_category_order) {
        queryOptions.order.push([Products, "category", filters.Products_category_order.toUpperCase()]);
      }
      if (filters.Users_firstName_order) {
        queryOptions.order.push([Users, "firstName", filters.Users_firstName_order.toUpperCase()]);
      }
    
    }

    const result = await UserProducts.findAll(queryOptions);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving UserServices records', error: error.message });
  }
};

module.exports = getAllUserProducts;
