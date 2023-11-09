const { Users } = require("../db")

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

        const user = await Users.findOrCreate({
            where: { ...req.body },
            // defaults: { steps }
        })

        return res.status(200).json(user)
    } catch (error) {
        return res.status(404).json({})
    }
}

module.exports = createUser;