const { Products } = require("../../db");


const deleteProduct = async(req,res)=>{
    try{
        let {id} = req.params
        console.log(id)
        const productToDelete = await Products.findByPk(id)

        if(!productToDelete) {
            return res.status(422).send({message:"Product not found"})
        }

        await productToDelete.destroy()
        return res.status(200).json(productToDelete)
    } catch(error){
        res.status(404)
        res.send({message: error.message}) 
    }
}

module.exports = {deleteProduct}