import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Group.png";
import SignupImage from "../assets/signup.png";
import "../styles/signup.css";
import HeaderOut from "../components/header_out";

const SignUp = () => {
  const navigate = useNavigate();

  const openLanding = () => {
    navigate("/");
  };

  const openConstruction = () => {
    navigate("/construction");
  };

  const openLogin = () => {
    navigate("/login");
  };

  const openSignUpDriver = () => {
    navigate("/signup_driver");
  };

  const openSignUpPassenger = () => {
    navigate("/signup_passenger");
  };

  return (
    <Container className="sign-up">
      <HeaderOut/>

      <div className="frame">
        <div className="frame-wrapper">
          <div className="div-wrapper">
            <div className="log-in-wrapper">
              <div className="log-in">Sign Up</div>
            </div>
          </div>
        </div>
      </div>
      <Button className="frame-2" onClick={openSignUpDriver}>
        <div className="text-wrapper-6">I’m a Driver</div>
      </Button>
      <Button className="frame-3" onClick={openSignUpPassenger}>
        <div className="text-wrapper-7">I’m a Passenger</div>
      </Button>
      <img className="element" alt="Element" src={SignupImage} />
      
    </Container>
    
  );
};

export default SignUp;
