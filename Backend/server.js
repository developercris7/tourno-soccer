const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const dotenv = require('dotenv')
dotenv.config()
const {connectToDb} = require('./database')
const signupRoute = require('./routes/signup')
const signinRoute = require('./routes/signin')
const dashboardRoute = require('./routes/dashboard')
const resetPasswordRoute = require('./routes/resetPassword')
const userProfileRoute = require('./routes/userProfile')

app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname,'public')))
app.use(express.static(path.join(__dirname,'uploads')))
app.use('/signup',signupRoute)
app.use('/signin',signinRoute)
app.use('/dashboard',dashboardRoute)
app.use('/resetPassword',resetPasswordRoute)
app.use('/userProfile',userProfileRoute)

connectToDb();

app.listen(process.env.PORT, (err)=>{
   console.log("Server is running on PORT " + process.env.PORT)
})