const express = require('express')
const router = express.Router()
const {authenticateUser} = require('../Controllers/signin')

router.post('/',async(req,res)=> {
    try{
        const {email,password} = await req.body
        const response = await authenticateUser(email,password)
        if(response === "Invalid User"){
            res.send("Invalid User")
        }else if(response === "Invalid Password"){
            res.send("Invalid Password")
        }else if(response){
            res.send(response)
        }
     }catch(err){
        console.log(err.message)
     }
})

module.exports = router