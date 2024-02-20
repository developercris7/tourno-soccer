const verifyUsers = require('../models/verifyUsers')
const Users = require('../models/users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const sendMail = require('./sendMail')
const {createUserProfile} = require('./userProfile')
const dotenv = require('dotenv')
dotenv.config()


const createUser = async (token) => {
   try{
    const userVerify = await verifyUsers.findOne({token : token})
      
    if(userVerify){
        const authToken = await jwt.sign(userVerify.email,process.env.signin_key)
        const verifiedUser = await Users.create({
            username : userVerify.username,
            email : userVerify.email,
            password : userVerify.password,
            token : authToken   
        })

        const subject = "Registration Successful"
        const content = `<h1>Welcome ${verifiedUser.username} </h1> <p>Your successfully registered into our application</p>
        `
        await sendMail(verifiedUser.email ,subject,content)
        await createUserProfile (verifiedUser.email ,verifiedUser.username)
        await verifyUsers.deleteMany({token : token})   
        return true;
    }
    return false;
   }catch(err){
    console.log(err.message)
    return "Server Busy"
   }

}


const authenticateUser = async(email,password) => {

    const existingUser = await Users.findOne({email : email})

    if(existingUser){
        const validPassword = await bcrypt.compare(password,existingUser.password)       
        if(validPassword){
            const token = jwt.sign(email,process.env.signin_key)
         await Users.findOneAndUpdate(
            {email : email},
            {$set : {token : token}},
            {new:true}
            )

            return token;   
        }
        return "Invalid Password"
    }
    return "Invalid User"
}

const authorizeUser = async (token) => {
     try{
        const decode_token = await jwt.verify(token,process.env.signin_key)
        
        const authorizedUser= await Users.findOne({email : decode_token})
        
        return authorizedUser;
        
     }catch(err){
        console.log(err.message)
     }
}

module.exports = {createUser,authenticateUser,authorizeUser}