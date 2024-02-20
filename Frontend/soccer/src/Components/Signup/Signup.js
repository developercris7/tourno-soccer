import React,{useState} from 'react'
import './signup.css'
import { FaUserSecret } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa6";
import axios from 'axios'
import url from '../../config'
import VerifyEmail from '../VerifyEmail/VerifyEmail';

import {Link} from 'react-router-dom'
import Form from '../Form/Form';
const Signup = () => {
    const [formData,seFormData] = useState({
        username : "",
        email :"",
        password:""
    })
   const [formError,setFormError] = useState()
//    const navigate = useNavigate()
   const [verify,setVerify] = useState(false)

    const forms = [
        {
            id:1,
            name:"username",
            placeholder:"Enter your username",
            type:"text",
            icon:<FaUserSecret />
        },
        {
            id:2,
            name:"email",
            placeholder:"Enter your email",
            type:"text",
            icon:<MdEmail className='fs-5' />
        },
        {
             id:3,
            name:"password",
            placeholder:"Enter your pasword",
            type:"password",
            icon :<FaLock />
        }
    ]
    const handleChange = (e) => {
        const {name,value} = e.target
        seFormData({...formData,[name]:value})
    }
   const validForm = () => {
    const errorObject = {}
      if(formData.username === ""){
        errorObject.username = "Username is required!"
      }
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if(formData.email===""){
        errorObject.email = "Email is required !"
   }else if(!emailRegex.test(formData.email)){
    errorObject.email = "Invalid email !"
   }
   const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
   if(formData.password === ""){
    errorObject.password = "Password is required !"
   }else if(!passwordRegex.test(formData.password)){
    errorObject.password = "Password should be strong ! ex:P@ssw0rd"
   }
   setFormError(errorObject);
   return Object.keys(errorObject).length === 0
   }

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(validForm()){
            const response = await axios.post(`${url}signup/verify`,formData)
            
            if(response.data === "User already Exists" ){
               setFormError({email:"User already Exists !"})
            }else if(response.data === "Server Busy"){
                // 404 page
                alert("Server Busy")
            }else if(response.data === "sent"){
               setVerify(true)
            }
        }
    }

  return (
    <div className='signup-container'>
     {(!verify)?(   <div className='signup-wrapper row'>
           
           <div className='d-none d-md-block col-md-6 img-col '>
              <h2>Sign Up</h2>
               <h5>Welcome to Tourno Soccer!</h5>
              <p>Create your account and dive into the world of soccer tournaments</p>
           </div>
          
           <div className='col-md-6 form-col '>
           <h1 className='d-none d-md-block'>Soccer</h1>
              <div className='text-center my-3 d-md-none'>
                  <h1 style={{color:"cornflowerblue",fontSize:"40px"}}>Sign Up</h1>
              <p style={{color:"grey",fontSize:"16px"}}>Create your account and dive into the world of soccer tournaments</p>

<img src="https://cdn-icons-png.flaticon.com/128/166/166258.png" alt=""/>
              </div>
             {/* <Form forms={forms} handleSubmit={handleSubmit} handleChange={handleChange} formError={formError}/> */}
             <Form forms={forms} handleSubmit={handleSubmit} handleChange={handleChange} formError={formError} btn={"Sign Up"}/>
               <p className='m-2'>Already have account ? <Link to="/signin">Sign In </Link></p>
           </div>
       </div>):(<VerifyEmail setVerify={setVerify} />)}
    </div>
  )
}

export default Signup