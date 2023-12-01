const { Op } = require("sequelize")
const { Users } = require("../../db")
const { isValidEmail, isValidPhoneNumber, validateSimpleDate } = require("../../utils/")
const uuid = require("uuid")

const createUser = async (req, res) => {
    const { ath0user } = req.body
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
        if (ath0user) {
            const userID = ath0user.user_id.replace("auth0|", "")
            const uuidFromAuth0UserId = uuid.v5(userID, uuid.v5.URL)
            let [newUser, created] = await Users.findOrCreate({
                where: {
                    [Op.or]: [{ userID: uuidFromAuth0UserId }, { email: ath0user.email }]
                },
                defaults: {
                    userID: uuidFromAuth0UserId,
                    firstName: "firstName",
                    lastName: "lastName",
                    email: ath0user.email,
                    password: "Is not necessary",
                    birth: "2023-10-03",
                    gender: "male",
                    address: "address",
                    phone: "phone",
                    contactPhone: "contactPhone",
                    photo: "https://i.imgur.com/kweAT9x.png",
                    enrollmentDate: Date.now(),
                    status: "unregistered",
                    systemRole: "User"
                }
            })
            if (!created) {
                return res.status(400).send({ message: "The user already exists" });
            }
            return res.status(200).json(newUser)
        }
        if (!firstName || !lastName || !email || !password ||
            !birth || !gender || !address || !phone || !contactPhone ||
            !photo || !enrollmentDate || !status || !systemRole)
            return res.status(404).json("Incomplete data")

        if (!isValidEmail(email))
            return res.status(404).json({ error: "Invalid email" })

        if (!validateSimpleDate(birth) || !validateSimpleDate(enrollmentDate))
            return res.status(404).json({ error: "Invalid date format" })

        if (!isValidPhoneNumber(phone) || !isValidPhoneNumber(contactPhone))
            return res.status(404).json({ error: "Invalid phone number" })

        const [newUser, created] = await Users.findOrCreate({
            where: {
                [Op.or]: [{ email }] //, { phone }]
            },
            defaults: { ...req.body }
        })

        if (!created)
            return res.status(404).json({ error: "User with this email already exists." })

        return res.status(200).json({ newUser, created })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message })
    }
}

module.exports = createUser;