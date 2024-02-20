const express = require('express')
const router = express.Router()
const {authorizeUser} = require('../Controllers/signin')

router.get('/',async(req,res)=>{
   try{
    const auth_token = await req.headers.authorization
    const response = await authorizeUser(auth_token)
    res.status(200).send(response)
   }catch(err){
    console.log(err.message)
    res.send("Serve Error")
   }
})

module.exports = router 