import React, { useState } from "react";
import "../styles/login_passenger.css";
import axios from "axios";
import logo from "../assets/Group.png"
import Car from "../assets/login.png"

import { useNavigate } from "react-router-dom";

export const Login = () => {

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
  const opendashpassenger = () => {
    navigate("/dash_passenger");
  }
  const openlanding = () => {
    navigate("/");
  }
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  
  const handleSubmit = (e) => {
    const data = {
      email,
      password,
    };

    axios
      .post('http://localhost:4000/loginpas', data)
      .then((user) => {
        localStorage.setItem("token", user.data.token)
        //console.log(user);
        navigate('/dash_passenger');
      })
      .catch((err) => {
        console.log(err);
      })
    };

  return (
    <div className="login-page">
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

        <div className="login-form">
          Log In as Passenger            
        </div>

        
          <div className="form-container">
            <input type="text"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            id="email" placeholder="Enter your email" />
            <br/>
            <input type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            id="password" placeholder="Enter your password" />
            <button onClick={handleSubmit} className="login-button">Log In</button>
          </div>
        
        

        
        
        <img className="main-image" alt="Main image" src={Car} />
        
        
      </div>
    </div>
  );
};

export default Login;