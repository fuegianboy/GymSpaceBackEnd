const { Products } = require("../../db");


const getProductByID = async(req,res)=>{
    try{
        let {id} = req.params
        console.log(id)
        const productFound = await Products.findByPk(id)

        if(!productFound) {
            return res.status(422).send({message:"Product not found"})
        }

        return res.status(200).json(productFound)
    } catch(error){
        res.status(500)
        res.send({message: error.message}) 
    }
}

module.exports = {getProductByID}