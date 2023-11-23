
module.exports = async (req, res) => {

    try {

        res.json("Alerts send succesfully")
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message })
    }
}