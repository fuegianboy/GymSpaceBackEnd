const { Users, Products, Services } = require("../../db")
const { isValidUUID } = require("../../utils")
const { getUUID } = require("../../utils/AuthUtils")

const getUserFavorites = async (req, res) => {

    try {
        const { id } = req.params
        const userUUID = isValidUUID(id) ? id : getUUID(id)

        if (!isValidUUID(userUUID))
            return res.status(404).json({ error: "id must be UUID format" })

        const user = await Users.findByPk(userUUID)

        if (!user)
            return res.status(404).json({ error: "User not found" });

        const arrayProducts = []
        if (user.favoriteProducts.lenght !== 0) {
            for (const productID of user.favoriteProducts) {
                const product = await Products.findByPk(productID)
                if (!product)
                    return res.status(404).json({ error: "Product not found" });
                
                const productData = {
                    type: "prod",
                    id: product.productID,
                    name: product.name,
                    image: product.image
                }
                arrayProducts.push(productData)
            }
        }

        const arrayServices = []
        if (user.favoriteServices.lenght !== 0) {
            for (const serviceID of user.favoriteServices) {
                const service = await Services.findByPk(serviceID)
                if (!service){
                    return res.status(404).json({ error: "Service not found" });
                }
                const serviceData = {
                    type: "serv",
                    id: service.serviceID,
                    name: service.name,
                    image: service.image
                }
                arrayServices.push(serviceData)
            }
        }

        const favoriteList = [...arrayProducts, ...arrayServices]

        return res.status(200).json(favoriteList)
    } catch (error) {
        console.error(error);
        return res.status(404).json({ error: error.message })
    }
}

module.exports = getUserFavorites;