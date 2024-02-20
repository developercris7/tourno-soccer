import React,{useEffect} from "react";
import {Link, useNavigate} from 'react-router-dom'

const Welcome = () => {
  const navigate = useNavigate()

  useEffect(()=>{
       const fetchData = async()=>{
        const userInfo = await localStorage.getItem('userInfo')
        if(userInfo){
          navigate('/dashboard')
        }
      }
      fetchData();
  },[navigate])


  return <div>
    <button className="btn btn-outline-primary">
      <Link to='/signin'>Sign In</Link>
      </button>
      <button className="btn btn-primary">
        <Link to='/signup'>Sign Up</Link>
      </button>
  </div>;
};

export default Welcome;
