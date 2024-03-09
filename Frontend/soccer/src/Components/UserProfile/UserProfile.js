import React, { useState,useEffect } from "react";
import "./userprofile.css";
import { FaUser } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { FaArrowLeftLong } from "react-icons/fa6";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FaEdit } from "react-icons/fa";
import UserProfileForm from "./UserProfileForm";
import url from '../../config'
import UploadImage from '../Upload/UploadImage'
import axios from 'axios'

const UserProfile = ({userImage,userData,userId,fetchData}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [tabs, setTabs] = useState("profile");
  const [profileImage,setProfileImage] = useState('')
  const profileTabs = [
    {
      id: 1,
      name: "profile",
      icon: <FaUser className="mx-1 fs-6" />,
    },
    {
      id: 2,
      name: "edit Profile",
      icon: <FaEdit className="mx-1 fs-6" />,
    },
  ];
  const [imageValid,setImageValid] = useState({})
  const [formData, setFormData] = useState(null);

  useEffect(()=>{
    if(userData){
    setFormData(JSON.parse(JSON.stringify(userData)));
    }
  },[userData]);
  
  const handleImageUpload = async() => {
       if(profileImage === ''){
        setImageValid({error : "upload Image first"})
       }else {
        setImageValid({response : "Image uploaded successfully !"})
        const imgData = new FormData()
        imgData.append("image", profileImage)
        const response = await axios.post(`${url}userProfile/uploadImage`,imgData, { headers: { 
          Authorization : `${userId}`,
          "Content-type": "multipart/form-data" }})        
          if(response.data === "uploaded"){
            setProfileImage('')
            // setTrigger(!trigger)
            fetchData();
            setTabs('profile')
            setImageValid({})
           }
       }
  }

  const handleUpdateProfile = async(e) => {
    e.preventDefault();
          const response = await axios.post(`${url}userProfile/edit`,formData,{headers : {
            Authorization : `${userId}`
          }})
          if(response.data === "error"){
            alert("Error in profile updation")
          }else if(response.data === "Server Busy"){
            alert("Server busy in update")
          }else if(response.data === "Updated"){
            fetchData();
            setTabs('profile')
          }
  }
  
  return (
    <>
      <div className="profile" onClick={handleShow}>
      <img src={`${url}${userImage}`} alt="userProfile" className="w-100 h-100"/>
      </div>

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        id="offcanvas"
      >
        <Offcanvas.Body>
          <FaArrowLeftLong className="fs-4 mb-2" onClick={handleClose} />
          <div className="profile-container">
            <div className="profile-wrapper">
              {/* profile Box */}
              <div className="profile-box">
                <div className="profile">
                  <img src={`${url}${userImage}`} alt="userProfile" className="w-100 h-100"/>
                </div>
                <div className="profile-info">
                  <span>Cris</span>
                  <span>devcris777@gmail.com</span>
                </div>
                <LuLogOut
                  role="button"
                  className="text-danger fw-600 ms-auto my-auto fs-4"
                />
              </div>
              {/* Photo upload */}
              {tabs !== "profile" ? (
                <div className="px-2 mt-1">
                  <h5 className="m-0">Your Photo</h5>
                  <p className="m-0">This will be display on your profile</p>

                  <div className="d-flex mt-1">
                    <UploadImage setProfileImage={setProfileImage} label ={"Upload"} />
                    <button className="btn btn-sm btn-primary mx-2 p-0" onClick={handleImageUpload}>
                      Save
                    </button>
                    {imageValid.error && <p className="err-text">{imageValid.error}</p>}
                    {imageValid.response && <p>{imageValid.response}</p>}
                  </div>
                </div>
              ) : (
                ""
              )}
              {/* profile tabs */}
              <div className="profile-tabs">
                {profileTabs.map((tab) => (
                  <span
                    className={`${tabs === tab.name ? "active" : ""}`}
                    onClick={() => setTabs(tab.name)}
                    key={tab.id}
                  >
                    {tab.icon}
                    {tab.name}
                  </span>
                ))}
              </div>

              {/* Profile infos */}

              <div className="info-box">
                <div
                  className={`info-container ${
                    tabs !== "profile" ? "tab-animate" : ""
                  }`}
                >
                  <div className="info-1">
                    
                    {userData && Object.entries(userData).map(([category, categoryData]) =>
                      Object.entries(categoryData).some(
                        ([key, value]) => value !== ""
                      ) ? (
                        <div key={category}>
                          <h1>{category}</h1>
                          {Object.entries(categoryData).map(([key, value]) =>
                            value !== "" ? (
                              <div key={key}>
                                <span>{key}</span>
                                <span>{value}</span>
                              </div>
                            ) : null
                          )}
                        </div>
                      ) : null
                    )}
                  </div>

                  <div className="info-1">
                    <UserProfileForm  formData={formData} setFormData={setFormData} handleUpdateProfile={handleUpdateProfile}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default UserProfile;
