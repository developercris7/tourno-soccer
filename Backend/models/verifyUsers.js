const mongoose = require('mongoose')

const verifyUserSchema = new mongoose.Schema({
    username : {
        type : String,
        required: true ,
    },
    email :{
        type : String ,
        required: true,
        unique : true
    },
    password : {
        type : String ,
        required : true
    },
    token : {
        type : String 
    }
})

module.exports = mongoose.model('verifyUser', verifyUserSchema , 'verifyUsers')