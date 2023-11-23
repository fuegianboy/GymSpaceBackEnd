const { UserServices } = require("../../db")

const deleteUserServiceById = async (req, res) => {

    try {
        let { id } = req.params
        const userServiceID = await UserServices.findByPk(id)
    
        if (!userServiceID) {
            return res.status(400).send({ message: "Service not found" })
        }
        
        await userServiceID.destroy()
        return res.status(200).json("Service deleted")
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Error deleting UserService record", error: error.message });
    }
}

module.exports = deleteUserServiceById;