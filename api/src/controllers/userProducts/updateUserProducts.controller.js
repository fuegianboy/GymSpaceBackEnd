const { UserProducts } = require("../../db")

const updateUserProduct = async (req, res) => {
    
    try {

        const data = req.body
        const {id} = req.params
        const userProduct  = await UserProducts.findByPk(id)

        if(!userProduct) {
            return res.status(422).send({message:"UserProduct not found"})
        }

        await userProduct.update({ ...data })
        return res.status(200).json(userProduct)
    
    } catch (error) {
        console.log(error)
        console.error(error)
        return res.status(500).send({ message: "Error modifying UserProduct record", error: error.message });
    }
}

module.exports = updateUserProduct
