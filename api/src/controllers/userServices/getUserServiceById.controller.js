const { UserServices } = require("../../db")
const { getUUID } = require("../../utils/AuthUtils")
const { isValidUUID } = require("../../utils")
module.exports = async (req, res) => {

    try {
        let { id } = req.params
        const userUUID = isValidUUID(id) ? id : await getUUID(id)
        const userCart = await UserServices.findAll({
            where: {
              userID: userUUID,
              mp_status: "approved",
            },
          });

        

        return res.status(200).json(userCart)
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Error getting UserService record",
            error: error.message
        });
    }
}
