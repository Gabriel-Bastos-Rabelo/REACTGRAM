const mongoose = require("mongoose");

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

//connection


const conn = async() => {


    try{
        const dbConn = mongoose.connect(`mongodb+srv://gbastosrabelo:${dbPass}@cluster0.wips5kj.mongodb.net/?retryWrites=true&w=majority`)

        console.log("Conectado ao Banco");

        return dbConn;

    }catch(error){
        console.log(error)
    }
}

conn();
module.exports = conn;
