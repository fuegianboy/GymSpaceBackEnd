const { Coaches } = require("../../db");

const getCoaches = async (req, res) => {

    try {

        const {name,orderby,order,valuation} = req.query;
        
        let data = await Coaches.findAll();

        if (name) {
            data = data.filter(coach => coach.firstName.toLowerCase().includes(name.toLowerCase()));
        }

        if (orderby && order) {

            if (orderby==="name") {

                if (order==="asc") {
                    data.sort((a, b) => a.firstName.localeCompare(b.firstName));
                } else if (order==="desc") {
                    data.sort((a, b) => b.firstName.localeCompare(a.firstName));
                }

            } else if (orderby==="valuation") {

                if (order==="asc") {
                    data.sort((a, b) => a.valuation - b.valuation);
                } else if (order==="desc") {
                    data.sort((a, b) => b.valuation - a.valuation);
                }

            }

        }

        if (valuation) {
            data = data.filter(coach=>coach.valuation === valuation);
        }

        if (!data || !data.length) {
            return res.status(404).json({error:'Coaches not Found'})
        }

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = getCoaches;