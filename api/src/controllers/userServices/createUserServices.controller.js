const { UserServices, Users, Services } = require('../../db');

const createUserService = async (req, res) => {
  const { userID, serviceID, startDate, finishDate, startTime, valuation, qty, unitPrice, date, status } = req.body;
  try {
    if (!startDate || !finishDate || !startTime || !qty || !unitPrice || !status) {
      return res.status(400).json({ error: "Incomplete Data" });
    }

    const user = await Users.findByPk(userID);
    const service = await Services.findByPk(serviceID);

    if (!user || !service) {
      return res.status(404).json({ error: 'User or Service not found' });
    }


    const userservice = await UserServices.create({
      userID,
      serviceID,
      startDate,
      finishDate,
      startTime,
      valuation,
      qty,
      unitPrice,
      date,
      status,
    });

    return res.status(201).json({ message: 'Service added to DB successfully', userservice });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error saving Service record', error: error.message });
  }
};

module.exports = createUserService;