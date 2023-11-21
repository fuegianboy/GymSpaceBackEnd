const { Op } = require("sequelize")
const { Users } = require("../../db")
const { isValidEmail, validateSimpleDate, isValidPhoneNumber } = require("../../utils")

const updateUser = async (req, res) => {

    try {
        const data = req.body
        const id = req.params.id
        const user = await Users.findByPk(id)

        if (!user)
            return res.status(404).json({ error: "Nonexistent Id user" })

        const {
            email,
            birth,
            enrollmentDate,
            phone,
            contactPhone
        } = data

        if ("email" in data) {
            if (!isValidEmail(email))
                return res.status(404).json({ error: "Invalid email" })

            const sameEmailUser = await Users.findOne({
                where: {
                    email,
                    userID: { [Op.not]: id }
                },
            })

            if (sameEmailUser)
                return res.status(404).json({ error: "Email already registered" })
        }

        if ("birth" in data && !validateSimpleDate(birth))
            return res.status(404).json({ error: "Invalid date format" })

        if ("enrollmentDate" in data && !validateSimpleDate(enrollmentDate))
            return res.status(404).json({ error: "Invalid date format" })

        if ("phone" in data) {
            if (!isValidPhoneNumber(phone))
                return res.status(404).json({ error: "Invalid phone number" })

            const samePhoneUser = await Users.findOne({
                where: {
                    phone,
                    userID: { [Op.not]: id }
                }
            })

            if (samePhoneUser)
                return res.status(404).json({ error: "Phone already registered" })
        }

        if ("contactPhone" in data && !isValidPhoneNumber(contactPhone))
            return res.status(404).json({ error: "Invalid phone number" })

        await user.update({ ...data })
        return res.status(200).json(user)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message })
    }
}

module.exports = updateUser;