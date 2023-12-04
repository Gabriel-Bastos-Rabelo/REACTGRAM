const User = require("../models/User")
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const authGuard = async (req, res, next) => {
    
    const authHeaders = req.headers["authorization"]

    const token = authHeaders && authHeaders.split(" ")[1];


    //check if header has a token

    if(!token) res.status(401).json({errors: ["Acesso negado"]})


    try{

        const verified = jwt.verify(token, jwtSecret);
        
        req.user = await User.findOne({ _id: verified.id }).select("-password");


        next();

    }catch(error){
        res.status(401).json({errors: ["Token inválido"]})
    }


}

module.exports = {authGuard};