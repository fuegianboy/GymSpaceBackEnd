const { Reviews } = require("../../db");

const createReview = async (req, res) => {

    const {
        userServicesID,
        comment,
        display
    } = req.body;
    try {

        if (!userServicesID || !comment || !display) {
            return res.status(404).json({ error: "Data Incomplete" });
        }

        const [newreview, created] = await Reviews.findOrCreate({
            where: { userServicesID },
            defaults: { comment, display },
        });

        if (!created) {
            return res.status(404).json({ error: "Review is already created" });
        }

        return res.status(200).json(newreview);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.message });
    }
}

module.exports = createReview;