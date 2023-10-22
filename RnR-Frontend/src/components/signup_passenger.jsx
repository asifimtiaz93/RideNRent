/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "../styles/signup_passenger.css";
import axios from "axios";
import logo from "../assets/Group.png"
import Car from "../assets/passenger.png"

import { useNavigate } from "react-router-dom";

const Signup_Passenger = () => {

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
  const [fullName, setfullName] = useState('');
  const [email, setemail] = useState('');
  const [mobile, setmobile] = useState('');
  const [password, setpassword] = useState('');
  
  const handleSaveUser = (e) => {
    const data = {
      fullName,
      email,
      mobile,
      password,     
    }; 
  
    axios
      .post('http://localhost:4000/register', data)
      .then(() => {
        navigate('/login');
      })
      .catch((err) => {
        console.log(err);
      });
    };


  return (
    <div className="signup_passenger-page">
      <div className="div">

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

        <div className="signup_passenger-form">
          Sign Up as Passenger             
        </div>

        
        <div className="signuppassenger-form-container">
        <input type="text"
        value={fullName}
        onChange={(e) => setfullName(e.target.value)}
        id="fullname" placeholder="Full Name" />

        <input type="text" 
        value={email}
        onChange={(e) => setemail(e.target.value)}
        id="email" placeholder="Email" />

        <input type="number" 
        value={mobile}
        onChange={(e) => setmobile(e.target.value)}
        id="mobile" placeholder="Phone Number" />

        <input type="password"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
        id="password" placeholder="New Password" />

        

        <button onClick={handleSaveUser} className="signup-passenger-button">SignUp</button>
        </div>
        
        

        
        
        <img className="main-image" alt="Main image" src={Car} />
        
        
      </div>
    </div>
  );
};

export default Signup_Passenger;