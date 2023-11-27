const { Reviews } = require("../../db");

const createReview = async (req, res) => {

    const {
        userServicesID,
        comment,
        display
    } = req.body;
    try {
        
        if (!userServicesID || !comment || !display ) {
            return res.status(404).json({error:"Data Incomplete"});
        }

        const [newreview,created] = await Reviews.findOrCreate({
            where: { ...req.body },
        });

        if (!created) {
            return res.status(404).json({error:"Error while creating Review"});
        }

        return res.status(200).json(newreview);
    } catch (error) {
        return res.status(404).json({error:error.message});
    }
}

module.exports = createReview;