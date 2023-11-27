const { Users } = require("../../db")
const { Op } = require("sequelize");
const setFilters = require("../../utils/users/setFilters");
const setOffsetAndLimit = require("../../utils/pagination/setOffsetAndLimit");
const setUpSorting = require("../../utils/users/setUpSorting");
const {getUUID,isAuthorized} =require("../../utils/AuthUtils")

/**
 * The getUsers function handles the logic for paginating through the list of users.
 */
const getAllUsers = async (req, res) => {

    try {
        const auth0User = await req.auth.payload.sub
        const rolesAllowed = ['Admin', 'Coach']
        const userUUID = await getUUID(auth0User)
        
        if(!await isAuthorized(userUUID,rolesAllowed)){
            return res.status(403).json({error: `only ${rolesAllowed} allowed`})
        }
        let options = { where: {}, order: [] };  // Sequelize options object for findAll

        options["where"] = setFilters(req.query)
        options["order"] = setUpSorting(req.query)

        // Set up pagination
        const { offset, limit } = setOffsetAndLimit(req.query.page, req.query.limit);
        options["offset"] = offset
        options["limit"] = limit

        // Use Sequelize findAll with the specified options
        const data = await Users.findAll(options);
        return res.status(200).json(data)
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message })
    }
}

module.exports = getAllUsers;