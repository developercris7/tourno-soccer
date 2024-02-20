const verifyUsers = require("../models/verifyUsers");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt')
const Users = require("../models/users");
const sendMail = require('./sendMail')

const dotenv = require("dotenv");
dotenv.config();

const checkUser = async (email) => {
  try {
    const user = await Users.findOne({ email: email });
    if (user) {
      return false;
    }
    return true;
  } catch (err) {
    console.log("err");
    return "Server Error";
  }
};

const createVerifyUser = async (username, email, password) => {
  try {
    const salt =  await bcrypt.genSalt(2)
   const hashPassword = await bcrypt.hash(password,salt)
    const token = await jwt.sign(email,process.env.signup_key)
    const link = `http://localhost:1500/signup/${token}`
    const subject = "Verification Mail"
    const content = `<h1>Welcome to Tourno Soccer </h1> <p>Please , Verify Your account by Click the below link </p> <a href="${link}">Click Here</a>`

    await verifyUsers.create({
        username : username ,
        email : email,
        password : hashPassword,
        token : token
    })

    sendMail(email,subject,content)

   return "Mail Sent"
  } catch (err) {
    console.log(err.message)
    return "Server Busy"
  }
};

module.exports = { checkUser, createVerifyUser };
