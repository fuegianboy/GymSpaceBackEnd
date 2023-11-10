const { Users } = require("../../db")
const { Op } = require("sequelize");
const { toTitle } = require("../../utils")

/**
 * The getUsers function handles the logic for paginating through the list of users.
 */
const getAllUsers = async (req, res) => {

    try {

        let options = { where: {}, order: [] };  // Sequelize options object for findAll

        // Check if first name is present in req.query
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

        // Check if first name is present in req.query
        const { lname } = req.query;
        if (lname) {
            const nameCleaned = lname
                .replace(/[^a-zA-ZáéíóúÁÉÍÓÚ\s]/g, "") // remove any characters in the name that are not letters (English or accented) or spaces.
                .replace(" ", "")
                .toLowerCase();

            options["where"]["lastName"] = {
                [Op.like]: "%" + nameCleaned + "%"
            }
        }

        // Check if email is present in req.query
        const { email } = req.query;
        if (email) {
            const emailCleaned = email
                .replace(" ", "")
                .toLowerCase();

            options["where"]["email"] = {
                [Op.like]: "%" + emailCleaned + "%"
            }
        }

        // Check if gender is present in req.query
        const { gender } = req.query;
        if (gender) {
            const genderCleaned = gender
                .replace(" ", "")
                .toLowerCase();

            options["where"]["gender"] = {
                [Op.eq]: genderCleaned
            }
        }

        // Check if status is present in req.query
        const { status } = req.query;
        if (status) {
            const statusCleaned = status
                .replace(" ", "")
                .toLowerCase()

            options["where"]["status"] = {
                [Op.eq]: statusCleaned
            }
        }

        // Check if systemRole is present in req.query
        const { systemRole } = req.query;
        if (systemRole) {
            const systemRoleCleaned = toTitle(systemRole
                .replace(" ", "")
                .toLowerCase()
            )

            options["where"]["systemRole"] = {
                [Op.eq]: systemRoleCleaned
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

        // Combined sorting
        const {
            sort_fname,
            sort_lname,
            sort_status,
            sort_systemRole,
        } = req.query

        const fname_direction = sort_fname?.replace(' ', '').toUpperCase()
        const lname_direction = sort_lname?.replace(' ', '').toUpperCase()
        const status_direction = sort_status?.replace(' ', '').toUpperCase()
        const systemRole_direction = sort_systemRole?.replace(' ', '').toUpperCase()
        
        if (["ASC", "DESC"].includes(fname_direction))
            options["order"].push(["firstName", fname_direction])

        if (["ASC", "DESC"].includes(lname_direction))
            options["order"].push(["lastName", lname_direction])

        if (["ASC", "DESC"].includes(status_direction))
            options["order"].push(["status", status_direction])

        if (["ASC", "DESC"].includes(systemRole_direction))
            options["order"].push(["systemRole", systemRole_direction])

        // Use Sequelize findAll with the specified options
        const data = await Users.findAll(options);
        return res.status(200).json(data)
    } catch (error) {
        console.error(error);
        return res.status(500).json('Internal Server Error')
    }
}

module.exports = getAllUsers;