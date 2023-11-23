const { Users, Services, UserServices } = require('../../db');
const setUpFilters = require('../../utils/userServices/setUpFilters');
const setUpSorting = require('../../utils/userServices/setUpSorting');

const getAllUserServices = async (req, res) => {
  try {

    const queryOptions = {
      where: {},
      include: [
        {
          model: Users,
          attributes: ['userID', 'firstName', 'lastName', 'email'],
          where: {},
        },
        {
          model: Services,
          attributes: ['serviceID', 'name', 'description', "startTime", "status", "coachID"],
          where: {},
        },
      ],
      order: [],
    }

    /**
     * Setear filtros por query usando datos de userServices, user o services.
     */
    const {
      userServicesOptions,
      userOptions,
      servicesOptions,
    } = setUpFilters(req.query)

    queryOptions["where"] = userServicesOptions
    queryOptions["include"][0]["where"] = userOptions
    queryOptions["include"][1]["where"] = servicesOptions

    /**
     * Set up sorting
     */
    queryOptions["order"] = setUpSorting(req.query)

    const result = await UserServices.findAll(queryOptions)
    return res.status(200).json(result)
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Error retrieving UserServices records',
      error: error.message
    });
  }
}

module.exports = getAllUserServices;



