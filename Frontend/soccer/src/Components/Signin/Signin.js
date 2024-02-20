import React,{useState} from 'react'
import '../Signup/signup.css'
// import { FaUserSecret } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import url from '../../config'
import {Link} from 'react-router-dom'
import Form from '../Form/Form';
import axios from 'axios';
const Signin = () => {
    const [formData,seFormData] = useState({
        email :"",
        password:""
    })
   const [formError,setFormError] = useState()
   const navigate = useNavigate()
    const forms = [
     
        {
            id:1,
            name:"email",
            placeholder:"Enter your email",
            type:"text",
            icon:<MdEmail className='fs-5' />
        },
        {
             id:2,
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
            const response = await axios.post(`${url}signin`,formData)
            if(response.data === "Invalid User"){
                setFormError({email : "Invalid User ! Please Register !"})
            } else if(response.data === "Invalid Password"){
                setFormError({password:"Invalid Password!"})
            }else {
                localStorage.setItem('userInfo',response.data)
                navigate('/dashboard')
            }
        }
    }

  return (
    <div className='signup-container'>
        <div className='signup-wrapper row'>
           
            <div className='d-none d-md-block col-md-6 img-col '>
               <h2>Sign In</h2>
                <h5>Welcome Back to Tourno Soccer!</h5>
               <p>Create your account and dive into the world of soccer tournaments</p>
            </div>
           
            <div className='col-md-6 form-col '>
            <h1 className='d-none d-md-block'>Soccer</h1>
               <div className='text-center my-3 d-md-none'>
                   <h1 style={{color:"cornflowerblue",fontSize:"40px"}}>Welcome Back</h1>
               <p style={{color:"grey",fontSize:"16px"}}>Create your account and dive into the world of soccer tournaments</p>
<img src="https://cdn-icons-png.flaticon.com/128/166/166258.png" alt=""/>
               </div>
              {/* <Form forms={forms} handleSubmit={handleSubmit} handleChange={handleChange} formError={formError}/> */}
              <Form forms={forms} handleSubmit={handleSubmit} handleChange={handleChange} formError={formError} btn={"Signin"}/>
               <div className='w-100 text-center text-md-start'>
               <p className='my-3 fs-6 mx-2'><Link to="/resetPassword">reset password ? </Link></p>
                <p className='m-2'>New user ? <Link to="/signup">Sign Up</Link></p>
               </div>
            </div>
        </div>
    </div>
  )
}

export default Signin