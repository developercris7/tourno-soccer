const express = require('express')
const router = express.Router()
const {checkUser , createVerifyUser} = require('../Controllers/signup')
const {createUser} = require('../Controllers/signin')
const path = require('path')

router.get('/:token',async(req,res)=> {
    const userToken = req.params.token 
    const response = await createUser(userToken)
    if(response === false){
      res.send("User Verfication failed , please try again")
    }else if(response === "Server Busy"){
      res.send("Server Busy")
    }else if(response === true){
      res.sendFile(path.join(__dirname,'..','views','verify.html'))
    }
})

router.post('/verify',async(req,res)=> {
  try{ 
    console.log("received")
      const {username,email, password} = await req.body;
      const checkUserExists = await checkUser(email)

      if(checkUserExists === false){
        res.send("User already Exists")
      }else if(checkUserExists === "Server Busy"){
        res.send("Server Busy")
      }
      else if(checkUserExists === true){
        const response = await createVerifyUser(username , email , password) 
        res.send('sent')
      }
  }catch(err){
   console.log(err.message)
  }
})

module.exports = router