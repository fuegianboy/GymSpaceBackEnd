const { Coaches } = require("../../db");
const { Op } = require("sequelize");

const getCoaches = async (req, res) => {

    try {
        
        let options = { where : {}, order:[]};

        // FILTERS

        // filter by FirstName
        const { name } = req.query;
        if (name) {
            const nameCleaned = name
                .replace(/[^a-zA-ZáéíóúÁÉÍÓÚ\s]/g, "") // remove any characters in the name that are not letters (English or accented) or spaces.
                .replace(" ", "")
                .toLowerCase();
            // options["where"]["firstName"] = {
            //     [Op.like] : "%"+nameCleaned+"%"
            // }
            options["where"] = {
                [Op.or]: [
                    { firstName: { [Op.like]: "%" + nameCleaned + "%" } },
                    { lastName: { [Op.like]: "%" + nameCleaned + "%" } }
                ]
            };
        }

        // filter by valuation
        const { valuation } = req.query;
        if (valuation) {
            const valNum = Number(valuation);
            if (valNum<11&&valNum>0) {
                options["where"]["valuation"] = {
                    [Op.eq]:valNum.toString()
                }
            }
        }

        // ORDER

        const { sort_name , sort_valuation } = req.query;

        const name_dir = sort_name?.replace(' ', '').toUpperCase();
        const val_dir = sort_valuation?.replace(' ', '').toUpperCase();

        if (["ASC", "DESC"].includes(name_dir)) {
            options["order"].push(["firstName", name_dir]);
        }

        if (["ASC", "DESC"].includes(val_dir)) {
            options["order"].push(["valuation", val_dir])
        }

        const data = await Coaches.findAll(options);

        if (!data || !data.length) {
            return res.status(404).json({error:"Coaches Not Found"});
        }

        return res.status(200).json(data);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

module.exports = getCoaches;