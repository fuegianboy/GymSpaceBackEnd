const { Services } = require("../../db");
const { Op } = require("sequelize");

const getAllServices = async (req, res) => {
  try {
    const { filters } = req.body;
    let allServices = await Services.findAll();
    
    if (filters) {
      // aca aplico filtros
      if (filters.name_filter) {
        allServices = allServices.filter(serv =>
          serv.name.toLowerCase().includes(filters.name_filter.toLowerCase())
        );
      }
    
      if (filters.category_filter) {
        allServices = allServices.filter(serv =>
          serv.category.toLowerCase().includes(filters.category_filter.toLowerCase())
        );
      }
    
      if (filters.coachID_filter) {
        allServices = allServices.filter(serv =>
          serv.coachID === filters.coachID_filter
        );
      }
    // aca aplico orden
    if (filters.name_order) {
      allServices.sort((a, b) => {
        return filters.name_order === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      });
    }

    if (filters.category_order) {
      allServices.sort((a, b) => {
        return filters.category_order === "asc"
          ? a.category.localeCompare(b.name)
          : b.category.localeCompare(a.name);
      });
    }
              
  }
  return res.status(200).json(allServices);
  } catch (error) {
    return res.status(500).send({ message: "Error retrieving Service records", error: error.message });
  }

};

module.exports = getAllServices;

