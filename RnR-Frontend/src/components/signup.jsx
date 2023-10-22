import React from "react";
import "../styles/signup.css";

import logo from "../assets/Group.png"
import Signup from "../assets/signup.png"

import { useNavigate } from "react-router-dom";

export const SignUp = () => {

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
  const opensignupdriver = () => {
    navigate("/signup_driver");
  }

  const opensignuppassenger = () => {
    navigate("/signup_passenger");
  }

  return (
    <div className="sign-up">

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


      <div className="frame">
        <div className="frame-wrapper">
          <div className="div-wrapper">
            <div className="log-in-wrapper">
              <div className="log-in">Sign Up</div>
            </div>
          </div>
        </div>
      </div>
      <div className="frame-2" onClick={opensignupdriver} >
        <div className="text-wrapper-6">I’m a Driver</div>
      </div>
      <div className="frame-3" onClick={opensignuppassenger} >
        <div  className="text-wrapper-7">I’m a Passenger</div>
      </div>
      <img className="element" alt="Element" src={Signup} />
    </div>
  );
};

export default SignUp;