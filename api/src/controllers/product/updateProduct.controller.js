const { Products } = require("../../db")

const updateProduct = async (req, res) => {

    try {
        const data = req.body
        const {id} = req.params
        const productToUpdate  = await Products.findByPk(id)

        if(!productToUpdate) {
            return res.status(422).send({message:"Product not found"})
        }
        await productToUpdate.update({ ...data })
        return res.status(200).json(productToUpdate)
    } catch (error) {
        return res.status(404).send({ message: error.message });
    }
}

module.exports = {updateProduct};