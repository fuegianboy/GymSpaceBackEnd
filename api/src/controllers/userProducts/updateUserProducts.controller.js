const { UserProducts } = require("../../db")
const { getUUID, isAuthorized } = require("../../utils/AuthUtils");

const updateUserProduct = async (req, res) => {
    
    try {

        const data = req.body
        const {id} = req.params
        const userProduct  = await UserProducts.findByPk(id)

        if(!userProduct) {
            return res.status(422).send({message:"UserProduct not found"})
        }
        const auth0User = await req.auth.payload.sub;
        const rolesAllowed = ["Admin"];
        const auth0UserUUID = await getUUID(auth0User);
        
        if (
          (await isAuthorized(auth0UserUUID, rolesAllowed)) ||
          auth0UserUUID === userProduct.userID
        ) {
        } else {
          return res
            .status(403)
            .json({
              error: "Only the user and administrator can edit a product record",
            });
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
