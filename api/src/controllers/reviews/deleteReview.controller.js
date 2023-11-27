const { UserServices } = require("../../db")

const deleteReview = async (req, res) => {

    try {
        let { id } = req.params
        const deleteReview = await Reviews.findByPk(id)
    
        if (!deleteReview) {
            return res.status(400).send({ message: "Review not found" })
        }
        
        await deleteReview.destroy()
        return res.status(200).json("Review deleted")
    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: "Error deleting Review record", error: error.message });
    }
}

module.exports = deleteReview;