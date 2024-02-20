const express = require('express')
const router = express.Router()
const userProfile = require('../models/userProfile')
const {createUserProfile,editUserProfile} = require('../Controllers/userProfile')
const upload = require('../Controllers/uploadFile')

router.get('/get',async(req,res) => {
    try{
        const email = req.headers.authorization;
        const user = await userProfile.findOne({userProfile:email})
        res.send(user)
    }catch(err){
     console.log(err.message)
     return "Server Busy"
    } 
})

router.post('/uploadImage',upload.single("image"),async(req,res) => {
   try{
    const image = req.file.filename
    const userId = req.headers.authorization
    const user = await userProfile.findOneAndUpdate(
        {userProfile : userId},
        {image : image},
        {new : true})
    if(user){
        res.send("uploaded")
    }   
   }catch(err){
    console.log(err.message)
   }
})

router.post('/edit',async(req,res)=>{
   try{
    const email = req.headers.authorization
    const data = req.body 
    const response = await editUserProfile(email,data)
    if(response === false){
        res.send("error")
    }
    else if(response === true){
        res.send("Updated")
    }
   }catch(err){
    console.log(err.message)
    return "Server Busy"
   }
})

module.exports = router 