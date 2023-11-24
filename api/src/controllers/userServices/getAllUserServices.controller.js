const { UserServices } = require('../../db');
const getUserServicesOptions = require('../../utils/userServices/getUserServicesOptions');
const setUpSorting = require('../../utils/userServices/setUpSorting');

const getAllUserServices = async (req, res) => {
  try {

    const queryOptions = getUserServicesOptions(req.query)
    queryOptions["order"] = setUpSorting(req.query)
    const orders = await UserServices.findAll(queryOptions)

    return res.status(200).json(orders)
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Error retrieving UserServices records',
      error: error.message
    });
  }
}

module.exports = getAllUserServices;



