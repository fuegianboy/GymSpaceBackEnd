const { Users } = require("../../db")
const { Op } = require("sequelize");
const setFilters = require("../../utils/users/setFilters");
const setOffsetAndLimit = require("../../utils/users/setOffsetAndLimit");
const setUpSorting = require("../../utils/users/setUpSorting");

/**
 * The getUsers function handles the logic for paginating through the list of users.
 */
const getAllUsers = async (req, res) => {

    try {

        let options = { where: {}, order: [] };  // Sequelize options object for findAll

        // Set up filters

        options["where"] = setFilters(req.query)

        // Set up sorting

        options["order"] = setUpSorting(req.query)

        // Set up pagination

        const { page, limit } = req.query;
        options = { ...options, ...setOffsetAndLimit(page, limit) }

        // Use Sequelize findAll with the specified options

        const data = await Users.findAll(options);
        return res.status(200).json(data)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message })
    }
}

module.exports = getAllUsers;