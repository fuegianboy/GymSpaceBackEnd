const { Op } = require("sequelize")
const { Users } = require("../../db")
const { isValidEmail, isValidPhoneNumber, validateSimpleDate } = require("../../utils/")

const createUser = async (req, res) => {

    const {
        firstName,
        lastName,
        email,
        password,
        birth,
        gender,
        address,
        phone,
        contactPhone,
        photo,
        enrollmentDate,
        status,
        systemRole
    } = req.body
    try {
        if (!firstName || !lastName || !email || !password ||
            !birth || !gender || !address || !phone || !contactPhone ||
            !photo || !enrollmentDate || !status || !systemRole)
            return res.status(404).json("Faltan datos")

        if (!isValidEmail(email))
            return res.status(404).json({ error: "Invalid email" })

        if (!validateSimpleDate(birth) || !validateSimpleDate(enrollmentDate))
            return res.status(404).json({ error: "Invalid date format" })

        if (!isValidPhoneNumber(phone) || !isValidPhoneNumber(contactPhone))
            return res.status(404).json({ error: "Invalid phone number" })

        console.log('req.body', req.body)
        const [newUser, created] = await Users.findOrCreate({
            where: {
                [Op.or]: [{ email }, { phone }]
            },
            defaults: { ...req.body }
        })

        if (!created)
            return res.status(404).json({ error: "User with this email or phone already exists." })

        return res.status(200).json({ newUser, created })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message })
    }
}

module.exports = createUser;