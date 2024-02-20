import React,{useState} from 'react'
import './resetpassword.css'
import handlePage from './handlePage'
import axios from 'axios'
import url from '../../config'

const ResetPassword = () => {

    const [formData,seFormData] = useState({
      email : "",
      verificationCode :"",
      password:""
  })
 const [formError,setFormError] = useState({
      email : "",
      verificationCode :"",
      password:""
 })

 const [page,setPage] = useState(1)
 const [verifyText,setVerifyText] = useState(false)

 const handleChange = (e) => {
  const {name,value} = e.target
  seFormData({...formData,[name]:value})
}

 const handleEmail = async (e) => {
  e.preventDefault();
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if(formData.email===""){
    // setFormError({email:"Email is required !"})
    setFormError({...formError,"email":"Email is required"}) 
}else if(!emailRegex.test(formData.email)){
  // setFormError({email :"Invalid Email !"})
  setFormError({...formError,"email":"Invalid Email !"}) 

}
else{
  const response = await axios.post(`${url}resetPassword`,formData)
  if(response.data === "User not found"){
    // setFormError({email : "Invalid User !"})
    setFormError({...formError,"email":"Invalid User !"}) 
    
  }else if(response.data === "Server Busy"){
    // 404
    alert("Server Busy")
  }else if(response.data === "sent"){
    setFormError({...formError,"email":""}) 
    setVerifyText(true)
    setTimeout(()=>{
      setVerifyText(false)
      setPage(2)
    },1500)
  }
  // console.log(formData)
}
 }

 const handleCode = async(e) => {
  e.preventDefault();
 if(formData.verificationCode === ""){
    // setFormError({["verificationCode"]: "Verification Code required !"})
    setFormError({...formError,"verificationCode":"verificationCode is required !"}) 

    console.log(formError)
 }else{
  const response = await axios.post(`${url}resetPassword/verifyCode`,formData)
  //  console.log(response.data)
   if(response.data === "invalid"){
    //  setFormError({["verficationCode"]: "Invalid Verification Code !"})
    setFormError({...formError,"verificationCode":"Invalid Verification Code !"}) 
     console.log(formError);
   }else if(response.data === "Server Busy"){
    // 404
    alert("Server Busy resetpassword")
   }else if(response.data === "valid"){
    // setFormError({["verifcationCode"]: ""})
    setFormError({...formError,"verificationCode":""}) 
    setVerifyText(true)
    setTimeout(()=>{
      setVerifyText(false)
      setPage(3)
    },1500)
   }
 } 
 }

 const handlePassword = async(e) => {
  e.preventDefault();
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if(formData.password === ""){
    setFormError({...formError,"password" :"Password is required ! "})
  }else if(!passwordRegex.test(formData.password)){
    setFormError({...formError,"password":"Password should be strong ! ex:P@ssw0rd"})
  }else{
    const response = await axios.post(`${url}resetPassword/newPassword`,formData)
    if(response.data === "Server Busy"){
      // 404
      alert("server busy newpassword")
    }else if(response.data === "success"){
      setFormError({...formError,"password":""})
      setPage(4)
      console.log(formData)
    }
  }
 }

  return (
    <div className='reset-container'>     
        {handlePage(page,handleChange,handleEmail,handleCode,handlePassword,formError,verifyText,formData)}
    </div>
  )
}

export default ResetPassword