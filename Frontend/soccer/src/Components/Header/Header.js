import React, { useState } from "react";
import "./header.css";
import { HiMenuAlt1 } from "react-icons/hi";
import { IoNotificationsSharp } from "react-icons/io5";
import Offcanvas from "react-bootstrap/Offcanvas";
import { IoMdClose } from "react-icons/io";
import UserProfile from "../UserProfile/UserProfile";

const Header = ({userImage,userData,userId,setTrigger}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // console.log(profileInfos)
  return (
    <div>
      <header>
        <HiMenuAlt1 className="d-md-none fs-2" onClick={handleShow} />
        <h3 className="my-auto">logo</h3>

        <div className="d-flex align-items-center">
          <div className="header-nav d-none d-md-block mx-3">
            <span>About us</span>
            <span>Terms and Conditions</span>
            <span>Privacy policy</span>
            <span>Contact us</span>
          </div>
          <IoNotificationsSharp className="fs-4 mx-2 mx-md-3 text-white" />
        {/* <Profile  profileInfos= {profileInfos}/> */}
        </div>

        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header>
            <Offcanvas.Title>Tourno Soccer</Offcanvas.Title>
            <IoMdClose className="fs-4" onClick={handleClose} />
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="header-nav d-flex flex-column justify-content-center align-items-center mx-3 text-dark">
              <span className="fs-5 my-3">About us</span>
              <span className="fs-5 my-3">Terms and Conditions</span>
              <span className="fs-5 my-3">Privacy policy</span>
              <span className="fs-5 my-3">Contact us</span>
              <button className="btn btn-danger my-5 mx-aut0">Sign Out</button>
            </div>
          </Offcanvas.Body>
        </Offcanvas>

      <UserProfile userImage={userImage} userData={userData} userId={userId} setTrigger={setTrigger}/>
      </header>
    </div>
  );
};

export default Header;
