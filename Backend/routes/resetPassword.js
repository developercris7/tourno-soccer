const express = require('express')
const router = express.Router()
const {checkUser} = require('../Controllers/signup')
const {createResetToken,updateNewPassword} = require('../Controllers/resetPassword')
const Users = require('../models/users')

router.post('/',async(req,res) => {
     try{  
        const {email} = await req.body

        const response = await checkUser(email)
        if(response === true){
            res.send("User not found")
        }else{
            createResetToken(email)
            res.send("sent")
        }

     }catch(err){
        console.log(err.message)
        res.send(err.message)
     }
}) 

router.post('/verifyCode',async(req,res)=> {
     try{
        const {email,verificationCode} = await req.body;
        const user = await Users.findOne({email : email})
       console.log(email)
        if(user){
            if(user.resetToken === verificationCode && Date.now()<= user.resetTokenExpiration){
                res.send("valid")
            }else{
               res.send("invalid")
            }
        }else{
         res.send("User not exists!")
        }
     }catch(err){
        console.log(err.message)
        res.send("Server Busy")
     }
})

router.post('/newPassword',async(req,res)=> {
   try{
    const {email , password } = await req.body ;
    await updateNewPassword(email , password)
    res.send("success")
   }catch(err){
    console.log(err.message)
    res.send("Server Busy")
   }
}) 

module.exports = router