const mongoose = require('mongoose')

const userProfileSchema = new mongoose.Schema({
    userProfile : {
        type : String 
    },
    image : {
        type : String
    },
    info : {
        personal : {
            username : String,
            gender : String ,
            age : String
        },
        contact : {
            email : String ,
            phone : String
        },
        club :{
            clubname : String ,
            position : String 
        },
        location : {
             state : String ,
             District : String 
        }
    }
})

module.exports = mongoose.model('userProfile',userProfileSchema,'userProfiles')