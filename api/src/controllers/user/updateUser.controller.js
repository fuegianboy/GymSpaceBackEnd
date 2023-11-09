const { Users } = require("../../db")

const updateUser = async (req, res) => {

    try {
        const data = req.body
        const id = req.params.id
        const user = await Users.findOrCreate({
            where: { id }
        })
        await user.update({ ...data })
        return res.status(200).json(user)
    } catch (error) {
        return res.status(404).json({})
    }
}

module.exports = updateUser;