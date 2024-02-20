const userProfile = require('../models/userProfile')

const createUserProfile = async(email,name) => {
       try{
        const user = await userProfile.create({
            userProfile : email ,
            image : 'profile.png',
            info : {
                personal :{
                    username: name,
                    gender : "",
                    age : ""
                },
                contact : {
                    email : email,
                    phone : ""
                },
                club : {
                    clubname  : "",
                    position : ""
                },
                location : {
                    state : "",
                    city : ""
                }
            }
        })
        console.log("User Profile created")
        console.log(user)
        return true;
       }catch(err){
        console.log(err.message + "userprofile")
       }
}

const editUserProfile = async(email , data) => {
        try{  
            const editedUser = await userProfile.findOneAndUpdate(
                {userProfile : email},
                {info : data},
                {new : true}
            )
           if(editedUser){
            return true
           }
           return false;
        }catch(err){
            console.log(err.message)
        }
}
module.exports = {createUserProfile,editUserProfile}