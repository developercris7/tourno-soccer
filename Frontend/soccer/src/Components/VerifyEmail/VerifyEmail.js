import React from 'react'
import './verifyemail.css'

const VerifyEmail = ({setVerify}) => {
  return (
    <div className='email-container'>
           <h2>Please Verify Your Email</h2>
           <p>We have sent an verification email to your email <b>devcris777@gmail.com</b></p>
           <img src="https://cdn-icons-png.flaticon.com/128/12440/12440591.png" alt="email-img"
           className='email-img'
           />
           <p>Just click on that link in a email to complete your signup</p>

           <p>If you didn't receive email or would like to change email</p>
           <button className='go-back-btn' onClick={()=>setVerify(false)}>Go Back</button>
    </div>
  )
}

export default VerifyEmail