const { Products } = require("../../db");
const {getUUID, isAuthorized} = require("../../utils/AuthUtils")

const deleteProduct = async(req,res)=>{
    try{
        let {id} = req.params
        
        const auth0User = await req.auth.payload.sub
        const rolesAllowed = ["Admin"]
        const userUUID = await getUUID(auth0User)
        
        if(!await isAuthorized(userUUID,rolesAllowed)){
            return res.status(403).json({error: `only ${rolesAllowed} allowed`})
        }
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