import React from "react";
import "../styles/header_out.css";
import logo from "../assets/Group.png"
import Main from "../assets/Main.jpg"
import { useNavigate } from "react-router-dom";
import {Button} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css"
export const HeaderOut = () => {

  const navigate=useNavigate();
  const openprofile = () => {
    navigate("/login");
  }
  const openlogout = () => {
    localStorage.removeItem("token");
    navigate("/signup");
  }
  const openconstruction = () => {
    navigate("/faq");
  }
  const openlanding = () => {
    navigate("/");
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
          <Button onClick={openprofile} className="text-wrapper-32" variant="outline-success">Log In</Button>
          <Button onClick={openlogout} className="text-wrapper-52" variant="success">Sign up</Button>
        </div>
      </header>
      
    </div>
  );
};

export default HeaderOut;