import React, { useState } from "react";
import "./navbar.css";
import { HiMiniTrophy } from "react-icons/hi2";
import { FaPenToSquare } from "react-icons/fa6";
import { IoGrid } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";

const Navbar = () => {
  const [active, setActive] = useState("Tournaments");

  const navigations = [
    {
      id: 1,
      icon: <HiMiniTrophy className="me-md-1 fs-5" />,
      navigation: "Tournaments",
    },
    {
      id: 2,
      icon: <FaPenToSquare className="me-md-1 fs-5" />,
      navigation: "Registers",
    },
    { id: 3, icon: <IoGrid className="me-md-1 fs-5" />, navigation: "Posts" },
    { id: 4, icon: <FaPlus className="me-md-1 fs-5" />, navigation: "Create" },
  ];
  return (
    <div>
      <nav className="nav-container">
        {navigations.map((nav) => (
          <div key={nav.id}>
            <div
              className={`d-none d-md-flex navigation ${
                active === nav.navigation ? "nav-active" : ""
              }`}
              onClick={() => setActive(nav.navigation)}
            >
              {nav.icon}
              <span className="nav-text">{nav.navigation}</span>
            </div>
            <div
              className={`navigation d-md-none ${
                active === nav.navigation ? "nav-active" : ""
              }`}
              onClick={() => setActive(nav.navigation)}
            >
              {nav.icon}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Navbar;
