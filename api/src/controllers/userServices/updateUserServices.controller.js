const { UserServices } = require("../../db")

const updateUserService = async (req, res) => {
    
    try {

        const data = req.body
        const {id} = req.params
        const userService  = await UserServices.findByPk(id)

        if(!userService) {
            return res.status(422).send({message:"UserService not found"})
        }

        await userService.update({ ...data })
        return res.status(200).json(userService)
    
    } catch (error) {
        console.log(error)
        console.error(error)
        return res.status(500).send({ message: "Error modifying UserService record", error: error.message });
    }
}

module.exports = updateUserService
