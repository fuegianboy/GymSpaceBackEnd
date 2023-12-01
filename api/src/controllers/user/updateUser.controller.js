const { Op } = require("sequelize")
const { Users } = require("../../db")
const { isValidEmail, validateSimpleDate, isValidPhoneNumber, isValidUUID } = require("../../utils")
const { getUUID } = require("../../utils/AuthUtils")

const updateUser = async (req, res) => {

    try {
        const data = req.body
        const id = req.params.id

        const userUUID = isValidUUID(id) ? id : getUUID(id)
        const user = await Users.findByPk(userUUID)

        if (!user)
            return res.status(404).json({ error: "Id user does not exist" })

        const {
            email,
            birth,
            enrollmentDate,
            phone,
            contactPhone,
            favoriteProducts,
            favoriteServices
        } = data

        if ("email" in data) {
            if (!isValidEmail(email))
                return res.status(404).json({ error: "Invalid email" })

            const sameEmailUser = await Users.findOne({
                where: {
                    email,
                    userID: { [Op.not]: userUUID }
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
                    userID: { [Op.not]: userUUID }
                }
            })

            if (samePhoneUser)
                return res.status(404).json({ error: "Phone already registered" })
        }

        if ("contactPhone" in data && !isValidPhoneNumber(contactPhone))
            return res.status(404).json({ error: "Invalid phone number" })

        if ("favoriteProducts" in data && isValidUUID(favoriteProducts)) {
            if (user.favoriteProducts.includes(favoriteProducts)) {
                const arrayFavorites = user.favoriteProducts.filter((id) => id !== favoriteProducts)
                data.favoriteProducts = arrayFavorites
            } else {
                data.favoriteProducts = [...user.favoriteProducts, favoriteProducts]
            }
        }

        if ("favoriteServices" in data && isValidUUID(favoriteServices)) {
            if (user.favoriteServices.includes(favoriteServices)) {
                const arrayFavorites = user.favoriteServices.filter((id) => id !== favoriteServices)
                data.favoriteServices = arrayFavorites
            } else {
                data.favoriteServices = [...user.favoriteServices, favoriteServices]
            }
        }

        await user.update({ ...data })
        return res.status(200).json(user)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message })
    }
}

module.exports = updateUser;