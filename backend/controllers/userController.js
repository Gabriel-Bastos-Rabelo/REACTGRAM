const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken")

const jwtSecret = process.env.JWT_SECRET;

//Generate user token
const generateToken = (id) => {
    return jwt.sign({id}, jwtSecret, {
        expiresIn: "7d"
    })
}

//Register user and sign in

const register = async(req, res) => {
    

    const {name, email, password} = req.body;
    //check if user exists
    

   
    const user = await User.findOne({email: email})
    
    if(user){
        res.status(422).json({errors: ["Por favor utilize outro email"]});
        return;
    }

    //Generate password hash

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    //Create user

    const newUser = await User.create({name, email, password: passwordHash});


    //if use was created sucessefully, return the token

    if(!newUser){
        res.status(422).json({errors: ["Houve um erro, por favor tente novamente mais tarde"]});
        return;
    }

    console.log(newUser);

    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser)
        
    })

    return;
    
}

const login = async (req, res) => {
    
    const {email, password} = req.body;
    console.log(email)

    const user = await User.findOne({email: email})

    if(!user){
        res.status(404).json({error: ["Usuário não encontrado!"]})
        return;
    }

    console.log(user.password)
    console.log(password)
    if(!(await bcrypt.compare(password, user.password))){
        console.log("chegou aqui");
        res.status(422).json({error: ["Senha incorreta!"]})
        return;
    }


    res.status(201).json({
        _id: user._id,
        profileImage: user.profileImage,
        token: generateToken(user._id)
    })

    return;
}   


module.exports = {
    register,
    login
};