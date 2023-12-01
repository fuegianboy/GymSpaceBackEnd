const createUserGoogle = async (req, res) => {
    try{
        console.log(req)
        return res.status(200).json({message: "Si escucha"})
    }catch(error){
        return res.status(500).json({error : error})
    }


}

module.exports = createUserGoogle;