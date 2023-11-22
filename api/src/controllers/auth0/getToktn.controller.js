const axios = require("axios").default
const getToken = async (req, res) => {

    const {username, password } = req.body
    let options = {
        method: 'POST',
        url: `https://${process.env.DOMAIN}/oauth/token`,
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        data: new URLSearchParams({
          grant_type: 'password',
          username: username,
          password: password,
          client_id: process.env.CLIENT_ID,
          client_secret: process.env.CLIENT_SECRET,
          audience: process.env.AUDIENCE
        })
      };
    try{
        const {data} = await axios.request(options)
        console.log(data)
        return res.status(200).json({accessToken:data.access_token})
    }catch(error){
        console.log(error)
        return res.status(400).json({error:error})
    }
}

module.exports = getToken;