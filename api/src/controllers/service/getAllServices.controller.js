const { Services, Users } = require("../../db");
const setUpFilters = require("../../utils/services/setUpFilters");
const setOffsetAndLimit = require("../../utils/pagination/setOffsetAndLimit");
const setUpSorting = require("../../utils/services/setUpSorting");

const getAllServices = async (req, res) => {
  try {

    let options = { 
      where: {}, 
      order: [], 
      include: [
        {
          model: Users,
          // where: {},
        },
      ],
    };  // Sequelize options object for findAll

    options["where"] = setUpFilters(req.query)
    options["order"] = setUpSorting(req.query)

    // Set up pagination
    const { offset, limit } = setOffsetAndLimit(req.query.page, req.query.limit)
    options["offset"] = offset
    options["limit"] = limit

    let allServices = await Services.findAll(options);
    return res.status(200).json(allServices);

  } catch (error) {
    console.log(error)
    return res.status(500).send({
      message: "Error retrieving Service records",
      error: error.message
    });
  }

};

module.exports = getAllServices;

