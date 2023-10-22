import React from "react";
import "../styles/login.css";

import logo from "../assets/Group.png"
import Signup from "../assets/signup.png"

import { useNavigate } from "react-router-dom";

export const LoginPage = () => {

  const navigate=useNavigate();
  const openlogin = () => {
    navigate("/login");
  }
  const opensignup = () => {
    navigate("/signup");
  }
  const openconstruction = () => {
    navigate("/construction");
  }
  const openlanding = () => {
    navigate("/");
  }
  const openlogindriver = () => {
    navigate("/login_driver");
  }

  const openloginpassenger = () => {
    navigate("/login_passenger");
  }

  return (
    <div className="login">

        <header className="header">
              <div className="group-2">
                <button onClick={openlanding} className="text-wrapper">RideNRent</button>
                <img className="group-3" alt="Group" src={logo} />
          </div>
         <div className="menu"> 
          <button onClick={openconstruction} className="text-wrapper-3">How it works</button>
          <button onClick={openlogin} className="text-wrapper-4">Log In</button>
          <button onClick={opensignup} className="text-wrapper-5">Sign Up</button>
        </div>
      </header>


      <div className="frame1">
        <div className="frame-wrapper1">
          <div className="div-wrapper1">
            <div className="log-in-wrapper1">
              <div className="log-in1">Log In</div>
            </div>
          </div>
        </div>
      </div>

      <div className="frame-21" onClick={openlogindriver} >
        <div className="text-wrapper-61">I’m a Driver</div>
      </div>
      <div className="frame-31" onClick={openloginpassenger} >
        <div  className="text-wrapper-71">I’m a Passenger</div>
      </div>
      <img className="element1" alt="Element" src={Signup} />
    </div>
  );
};

export default LoginPage;
 