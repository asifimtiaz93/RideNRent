
import React, { useState }  from "react";
import "../styles/signup_driver.css";
import logo from "../assets/Group.png"
import Car from "../assets/driver.png"
import axios from "axios";



import { useNavigate } from "react-router-dom";

export const Signup_Driver = () => {

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
  const [fullName, setfullName] = useState('');
  const [email, setemail] = useState('');
  const [mobile, setmobile] = useState('');
  const [password, setpassword] = useState('');
  const [vehnum, setvehnum] = useState('');
  const [licnum, setlicnum] = useState('');
  const [make, setmake] = useState('');
  const [model, setmodel] = useState('');
  const [capacity, setcapacity] = useState('');
  const [year, setyear] = useState('');
  const [color, setcolor] = useState('');




  const handleSaveUser = (e) => {
    const data = {
      fullName,
      email,
      mobile,
      password,  
      vehnum,
      licnum,   
      make,
      model,
      capacity,
      year,
      color
    }; 
  
    axios
      .post('http://localhost:4000/registerDvr', data)
      .then(() => {
        navigate('/login');
      })
      .catch((err) => {
        console.log(err);
      });
    };

  return (
    
    <div className="signup_driver-page">
      
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

        <div className="signup_driver-form">
          Sign Up             
        </div>

        
        <div className="signupdriver-form-container">
        <h2 className="px-7 text-white">Personal Information</h2>
        
           
            
        <input type="text"
        value={fullName}
        onChange={(e) => setfullName(e.target.value)}
        id="fullname" placeholder="Full Name" />

        <input type="text" 
        value={email}
        onChange={(e) => setemail(e.target.value)}
        id="email" placeholder="Email" />

        <input type="tel" 
        value={mobile}
        onChange={(e) => setmobile(e.target.value)}
        id="mobile" placeholder="Phone Number" />

        <input type="password"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
        id="password" placeholder="New Password" />

        <input type="text" 
        value={vehnum}
        onChange={(e) => setvehnum(e.target.value)}
        id="vehnum" placeholder="Vehicle Registration Number ex: DHAKA-D-11-9999" />

        <input type="text" 
        value={licnum}
        onChange={(e) => setlicnum(e.target.value)}
        id="licnum" placeholder="License Number" />
        <br/>
        
        <h2 className="tw-text-3xl">Vehicle Information</h2>
        <input type="text"
        value={make}
        onChange={(e) => setmake(e.target.value)}
        id="make" placeholder="Make" />
        <input type="text"
        value={model}
        onChange={(e) => setmodel(e.target.value)}
        id="model" placeholder="Model" />
        <input type="text"
        value={color}
        onChange={(e) => setcolor(e.target.value)}
        id="color" placeholder="Color" />
        <input type="number"
        value={year}
        onChange={(e) => setyear(e.target.value)}
        id="year" placeholder="Year" /> 
        <input type="number"
        value={capacity}
        onChange={(e) => setcapacity(e.target.value)}
        id="capacity" placeholder="Capacity" />
        <br/>
        <br/>

        <button onClick={handleSaveUser} className="signup-driver-button">SignUp</button>
        </div>
        
        
        <img className="main-image" alt="Main image" src={Car} />
        
        
      </div>
    </div>
  );
};

export default Signup_Driver;