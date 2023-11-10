const { Users } = require("../../db")
const { Op } = require("sequelize");

/**
 * The getUsers function handles the logic for paginating through the list of users.
 */
const getAllUsers = async (req, res) => {

    try {

        let options = { where: {} };  // Sequelize options object for findAll

        // Check if first name are present in req.query
        const { fname } = req.query;
        if (fname) {
            const nameCleaned = fname
                .replace(/[^a-zA-ZáéíóúÁÉÍÓÚ\s]/g, "") // remove any characters in the name that are not letters (English or accented) or spaces.
                .replace(" ", "")
                .toLowerCase();

            options["where"]["firstName"] = {
                [Op.like]: "%" + nameCleaned + "%"
            }
        }

        // Check if limit and page are present in req.query
        if (req.query.limit && req.query.page) {
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);

            // Validate that page and limit are positive integers
            if (!isNaN(page) && !isNaN(limit) && page > 0 && limit > 0) {
                const offset = (page - 1) * limit;

                // Set Sequelize options for pagination
                options = { offset, limit };
            }
            else {
                // Return a bad request response if page or limit are invalid
                return res.status(400).json('Invalid page or limit');
            }
        }

        // Use Sequelize findAll with the specified options
        const data = await Users.findAll(options);
        return res.status(200).json(data)
    } catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error')
    }
}

module.exports = getAllUsers;