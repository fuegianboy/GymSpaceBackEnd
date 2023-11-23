const { UserProducts } = require("../../db")

const deleteUserProductById = async (req, res) => {

    try {
        let {id} = req.params
        const userProductID = await UserProducts.findByPk(id)
    
        if(!userProductID) {
            return res.status(400).send({message:"Service not found"})
        }
        
        await userProductID.destroy()
        return res.status(200).json("Service deleted")
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Error deleting UserService record", error: error.message });
      }
}

module.exports = deleteUserProductById;