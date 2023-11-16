import React from "react";
import "../styles/landing.css"

import logo from "../assets/Group.png"
import Main from "../assets/Main.jpg"
import left from "../assets/left.svg"
import right from "../assets/right.svg"
import Footer from "../components/Footer";

import { useNavigate } from "react-router-dom";

export const Landing = () => {

  const navigate=useNavigate();
  const openlogin = () => {
    navigate("/login");
  }
  const opensignup = () => {
    navigate("/signup");
  }

  const faq = () => {
    navigate("/faq");
  }
  const openlanding = () => {
    navigate("/");
  }
  
  return (
    <div className="landing-page">
      <div className="div">

      <header className="header">
              <div className="group-2">
                <button className="text-wrapper">RideNRent</button>
                <img className="group-3" alt="Group" src={logo} />
          </div>
         <div className="menu"> 
          <button onClick={faq} className="text-wrapper-3">How it works</button>
          <button onClick={openlogin} className="text-wrapper-4">Log In</button>
          <button onClick={opensignup} className="text-wrapper-5">Sign Up</button>
        </div>
      </header>

        <div className="REGISTER-SAVE-MONEY">
          REGISTER,
          <br />
          SAVE MONEY, MAKE
          <br />
          FRIENDS!
        </div>
        <p className="its-simple-and-its">
          Its simple and its easy. Play your part in reducing Carbon. Footprint and help Mother Nature to sustain its
          beauty. 
          <br />
          So what are you waiting for?
          <br />
          Lets ride together !
       
        </p>
        <div className="footer">
        <Footer/>
        </div>
  
        <img className="main-image" alt="Main image" src={Main} />
        <button className="overlap-5">
          <div className="group-wrapper">
            <div className="div-wrapper">
              <div className="overlap-group-2">
                <div onClick={openlogin} className="text-wrapper-7">OFFER A RIDE</div>
              </div>
            </div>
          </div>
          <img className="img-2" alt="Img" src={right} />
        </button>
        <button className="overlap-4">
          <div className="group-wrapper">
            <div className="div-wrapper">
              <div className="overlap-group-2">
                <div onClick={openlogin} className="text-wrapper-7">FIND A RIDE</div>
              </div>
            </div>
          </div>
          <img className="img-2" alt="Img" src={left} />
        </button>
      </div>
  
    </div>
  );
};

export default Landing;