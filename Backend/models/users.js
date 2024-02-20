const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : {
        type : String ,
    },
    email : {
        type : String ,
    },
    password :{
        type : String
    },
    token : {
        type : String ,
    },
    date : {
        type : Date ,
        default : Date.now(),
        immutable : true
    },
    resetToken : {
        type : String
    },
    resetTokenExpiration : {
        type : String
    }

})

module.exports = mongoose.model('Users', userSchema,'users')