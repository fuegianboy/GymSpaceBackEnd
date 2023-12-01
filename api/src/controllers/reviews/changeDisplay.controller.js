const { Reviews } = require("../../db")

const changeDisplay = async (req, res) => {

    try {
        const data = req.body
        const {id} = req.params
        const review  = await Reviews.findByPk(id)

        if(!review) {
            return res.status(404).send({message:"Review not found"})
        }
        await review.update({ ...data })
        return res.status(200).json(review)
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: error.message });
    }
}

module.exports = changeDisplay;