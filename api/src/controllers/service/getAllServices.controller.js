const { Services } = require("../../db");
const { Op } = require("sequelize");
const { isValidHourMinuteFormat, minValidHourMinuteFormat, maxValidHourMinuteFormat, parseIntStrict } = require("../../utils");
const { validatePositiveIntegerHandler } = require("../../handlers/validateDuration");

const getAllServices = async (req, res) => {
  try {
    const {
      name,
      category,
      status,
      coachId,
      areaId,
      startTime, endTime,
      startDuration, endDuration,
      minCapacity, maxCapacity,
      // startDuration: startDurationData, endDuration: endDurationData,
      // minCapacity: minCapacityData, maxCapacity: maxCapacityData,
    } = req.query;

    let options = { where: {}, order: [] };  // Sequelize options object for findAll

    // Transformation

    // const startDuration = parseIntStrict(startDurationData)
    // const endDuration = parseIntStrict(endDurationData)
    // const minCapacity = parseIntStrict(minCapacityData)
    // const maxCapacity = parseIntStrict(maxCapacityData)

    // Validations

    if (startTime && !isValidHourMinuteFormat(startTime))
      return res.status(404).json({ error: "Invalid startTime format hour:minute (00:00)." })

    if (endTime && !isValidHourMinuteFormat(endTime))
      return res.status(404).json({ error: "Invalid endTime format hour:minute (00:00)." })

    const validateStartDuration = validatePositiveIntegerHandler(startDuration, "startDuration")
    if (validateStartDuration.error) return res.status(404).json(validateStartDuration)

    const validateEndDuration = validatePositiveIntegerHandler(endDuration, "endDuration")
    if (validateEndDuration.error) return res.status(404).json(validateEndDuration)

    const validateMinCapacity = validatePositiveIntegerHandler(minCapacity, "minCapacity")
    if (validateMinCapacity.error) return res.status(404).json(validateMinCapacity)

    const validateMaxCapacity = validatePositiveIntegerHandler(maxCapacity, "maxCapacity")
    if (validateMaxCapacity.error) return res.status(404).json(validateMaxCapacity)

    // Filters

    if (name) {
      options["where"]["name"] = { [Op.iLike]: "%" + name + "%" }
    }

    if (category) {
      const categoryCleaned = category.replace(" ", "").toLowerCase();
      options["where"]["category"] = { [Op.iLike]: "%" + categoryCleaned + "%" }
    }

    if (status) {
      const statusCleaned = status.replace(" ", "").toLowerCase();
      options["where"]["status"] = { [Op.iLike]: "%" + statusCleaned + "%" }
    }

    if (coachId) {
      const coachIdCleaned = coachId.replace(" ", "").toLowerCase();
      options["where"]["coachID"] = { [Op.iLike]: `%${coachIdCleaned}%` }
    }

    if (areaId) {
      const areaIdCleaned = areaId.replace(" ", "").toLowerCase();
      options["where"]["areaID"] = { [Op.iLike]: `%${areaIdCleaned}%` }
    }

    if (startTime || endTime) {
      const startTimeQuery = startTime || minValidHourMinuteFormat
      const endTimeQuery = endTime || maxValidHourMinuteFormat
      options.where.startTime = { [Op.between]: [startTimeQuery, endTimeQuery] }
    }

    // if (startDuration && endDuration) {
    //   options.where.duration = { [Op.between]: [startDuration, endDuration] }
    // }
    // else if (startDuration) {
    //   options.where.duration = { [Op.gte]: startDuration }
    // }
    // else if (endDuration) {
    //   options.where.duration = { [Op.lte]: endDuration }
    // }

    if (minCapacity && maxCapacity) {
      options.where.capacity = { [Op.between]: [minCapacity, maxCapacity] }
    }
    else if (minCapacity) {
      options.where.capacity = { [Op.gte]: minCapacity }
    }
    else if (maxCapacity) {
      options.where.capacity = { [Op.lte]: maxCapacity }
    }

    // Sorting

    const {
      sort_name,
      sort_category,
      sort_price,
      sort_startTime,
      sort_duration,
      sort_status,
      sort_coachId,
      sort_capacity,
      sort_areaId,
    } = req.query

    const addOrder = (field, direction) => {
      if (["ASC", "DESC"].includes(direction)) {
        options["order"].push([field, direction]);
      }
    }

    addOrder("name", sort_name?.replace(' ', '').toUpperCase());
    addOrder("category", sort_category?.replace(' ', '').toUpperCase());
    addOrder("price", sort_price?.replace(' ', '').toUpperCase());
    addOrder("startTime", sort_startTime?.replace(' ', '').toUpperCase());
    addOrder("duration", sort_duration?.replace(' ', '').toUpperCase());
    addOrder("status", sort_status?.replace(' ', '').toUpperCase());
    addOrder("coachID", sort_coachId?.replace(' ', '').toUpperCase());
    addOrder("capacity", sort_capacity?.replace(' ', '').toUpperCase());
    addOrder("areaID", sort_areaId?.replace(' ', '').toUpperCase());

    // const nameDirection = sort_name?.replace(' ', '').toUpperCase()

    // if (["ASC", "DESC"].includes(nameDirection))
    //   options["order"].push(["name", nameDirection])

    // Send response

    let allServices = await Services.findAll(options);
    return res.status(200).json(allServices);

    const { filters } = req.body;

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
  } catch (error) {
    return res.status(500).send({
      message: "Error retrieving Service records",
      error: error.message
    });
  }

};

module.exports = getAllServices;

