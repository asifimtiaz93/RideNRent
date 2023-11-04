import React from "react";
import "../styles/header2.css";
import logo from "../assets/Group.png"
import Main from "../assets/Main.jpg"
import { useNavigate } from "react-router-dom";
import {Button} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css"
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
      <header className="header22">
        <div className="group-22">
            <Button onClick={openlanding} className="text-wrapper2" >RideNRent</Button>
            <img className="group-32" alt="Group" src={logo} />
          </div>
         <div className="menu2"> 
          <Button onClick={openconstruction} className="text-wrapper-32" variant="outline-success">How it works</Button>
          <Button onClick={openprofile} className="text-wrapper-32" variant="outline-success">Profile</Button>
          <Button onClick={openlogout} className="text-wrapper-52" variant="success">Log Out</Button>
        </div>
      </header>
      
    </div>
  );
};

export default Header2;