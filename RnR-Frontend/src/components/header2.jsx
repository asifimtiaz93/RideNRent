import React from "react";
import "../styles/header2.css";
import logo from "../assets/Group.png"
import Main from "../assets/Main.jpg"
import { useNavigate } from "react-router-dom";

export const Header2 = () => {

  const navigate=useNavigate();
  const openprofile = () => {
    navigate("/profile_driver");
  }
  const openlogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }
  const openconstruction = () => {
    navigate("/construction");
  }
  const openlanding = () => {
    navigate("/dash_driver");
  }
  
  return (
    <div className="header2">
      <div className="div2">

      <header className="header22">
              <div className="group-22">
                <button onClick={openlanding} className="text-wrapper2">RideNRent</button>
                <img className="group-32" alt="Group" src={logo} />
          </div>
         <div className="menu2"> 
          <button onClick={openconstruction} className="text-wrapper-32">How it works</button>
          <button onClick={openprofile} className="text-wrapper-42">Profile</button>
          <button onClick={openlogout} className="text-wrapper-52">Log Out</button>
        </div>
      </header>
      </div>
    </div>
  );
};

export default Header2;