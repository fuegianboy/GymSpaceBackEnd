const { Op } = require("sequelize")
const { Services, Users } = require("../../db")
const { isValidHourMinuteFormat } = require("../../utils/")
const { isValidImageUrl } = require("../../utils/isValidImageUrl")

const createService = async (req, res) => {

    const {
        name,
        description,
        category,
        price,
        startTime,
        duration,
        image: imageReq,
        status,
        coachID,
        capacity,
        areaID,
        coachIDs
    } = req.body
    console.log(coachIDs)
    try {
        if (!name || !description || !category || !price ||
            !startTime || !duration || !imageReq || !status || !coachID ||
            !capacity || !areaID)
            return res.status(404).json("Incomplete data")

        // Transformation

        const image = imageReq.trim()

        // Validate types and format

        if (isNaN(price))
            return res.status(404).json({ error: "price is not a number" })

        if (!isValidHourMinuteFormat(startTime))
            return res.status(404).json({ error: 'Start time must be in "hour:minute" format ("00:00" to "23:59").' })

        if (isNaN(duration) || !Number.isInteger(duration))
            return res.status(404).json({ error: "Duration must be an Integer." })

        if (!isValidImageUrl(image))
            return res.status(404).json({ error: "Invalid image url." })

        if (isNaN(capacity) || !Number.isInteger(capacity))
            return res.status(404).json({ error: "Capacity must be an Integer." })

        // Validate uniqueness

        const [service, created] = await Services.findOrCreate({
            where: {
                [Op.or]: [{ name }]
            },
            defaults: {
                    name,
                    description,
                    category,
                    price,
                    startTime,
                    duration,
                    image: imageReq,
                    status,
                    coachID,
                    capacity,
                    areaID,
                }
        })

        // Agregar coaches
        // await service.addUsers(coachIDs)
        // const teamIds = await Promise.all(coachIDs.map(async (id) => {
        //     const team = await Users.findOne({ where: { userID: id } });
        //     return team.id;
        // }));
        // await service.setUsers(coachIDs);
        const coaches = await Users.findAll({
            where: {
              userID: coachIDs,
              systemRole: 'Coach',
            },
          });
      
          // Asignar coaches al servicio a través de la tabla intermedia ServiceCoach
          await service.addUsers(coaches);


        if (!created)
            return res.status(404).json({
                error: `Service with name "${name}" already exists.`
            })

        return res.status(200).json(service)
    } catch (error) {
        return res.status(500).send({ message: "Error saving Service record", error: error.message });
    }
}

module.exports = createService;