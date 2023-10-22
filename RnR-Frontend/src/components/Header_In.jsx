import React from "react";
import "../styles/Header_In.css";
import logo from "../assets/Group.png"
import { useNavigate } from "react-router-dom";

export const Header_In = () => {

  const navigate=useNavigate();
  const openprofile = () => {
    navigate("/profile_driver");
  }
  const openlogout = () => {
    navigate("/");
  }
  const openlanding = () => {
    navigate("/");
  }
  
  return (
    <div className="Header_In">
      <header className="Header_In_0">
        <div className="Header_In_1">
          <button onClick={openlanding} className="Header_In_T1">RideNRent</button>
          <img className="Header_In_L" alt="Group" src={logo} />
        </div>
        <div classname="Header_In_2"> 
          <button onClick={openprofile} className="Header_In_T2">Profile</button>
          <button onClick={openlogout} className="Header_In_T3">Log Out</button>
        </div>
      </header>
    </div>
    
  );
};

export default Header_In;