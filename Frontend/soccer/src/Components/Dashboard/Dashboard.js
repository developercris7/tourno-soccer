import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import url from "../../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userImage, setUserImage] = useState();
  const [userData, setUserData] = useState();
  const [userId,setUserId] = useState('')
  const [trigger,setTrigger] = useState(false)

  const fetchData = async () => {
    const token = localStorage.getItem("userInfo");
    const userInfo = await localStorage.getItem("userInfo");
    if (userInfo) {
      const data = await axios.get(`${url}dashboard`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      
      const userProfile = data.data.email;
      setUserId(userProfile)
      const userProfileInfo = await axios.get(`${url}userProfile/get`, {
        headers: {
          Authorization: `${userProfile}`,
        },
      });

      setUserImage(userProfileInfo.data.image);
      setUserData(userProfileInfo.data.info);
      // console.log(userData)
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  // console.log(userId)
  return (
    <div>
      <Header userImage={userImage} userData={userData} userId={userId} fetchData={fetchData}/>
      <Navbar />
    </div>
  );
};

export default Dashboard;
