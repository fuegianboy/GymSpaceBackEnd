const { Users } = require("../../db")
const { Op } = require("sequelize")
const uuid = require('uuid');
const createUserGoogle = async (req, res) => {
    try{
        const {auth0user} = req.body
        const[source,userID] = auth0user.user_id.split("|")
        if(source !== 'auth0'){
            const uuidFromAuth0UserId = uuid.v5(userID, uuid.v5.URL)
            let [newUser, created] = await Users.findOrCreate({
                where: {
                    [Op.or]: [{ userID:uuidFromAuth0UserId }, { email: auth0user.email }]
                },
                defaults: {
                    userID: uuidFromAuth0UserId,
                    firstName: "firstName",
                    lastName: "lastName",
                    email: auth0user.email,
                    password: "No es necesario",
                    birth:"2023-10-03",
                    gender: "male",
                    address: "address",
                    phone: "phone",
                    contactPhone: "contactPhone",
                    photo: "https://i.imgur.com/kweAT9x.png",
                    enrollmentDate: Date.now(),
                    status: "unregistered",
                    systemRole: "User"
                }
            })
            return res.status(200).json({userCreated: created})
        }
        
        return res.status(200).json({message: "Auth0 user"})
    }catch(error){
        console.log(error)
        return res.status(500).json({error : error})
    }


}

module.exports = createUserGoogle;