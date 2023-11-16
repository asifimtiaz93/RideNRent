import React from "react";
import "../styles/signup.css";

import logo from "../assets/Group.png"
import Signup from "../assets/signup.png"
import {Button, Card, Col, Row, Image} from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css"
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";


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
  const openSignUpDriver = () => {
    navigate("/signup_driver");
  };

  const openSignUpPassenger = () => {
    navigate("/signup_passenger");
  };

  return (
    <div className="login">

        <header className="header">
              <div className="group-2">
                <Button onClick={openlanding} className="text-wrapper" variant="outline-success">RideNRent</Button>
                <img className="group-3" alt="Group" src={logo} />
          </div>
         <div className="menu"> 
          <Button onClick={openconstruction} className="text-wrapper-3"variant="outline-success">How it works</Button>
          <Button onClick={openlogin} className="text-wrapper-4"variant="outline-success">Log In</Button>
          <Button onClick={opensignup} className="text-wrapper-5" variant="success">Sign Up</Button>
        </div>
      </header>
    <Row>


      <Col md={6} >

          <h1 className="heading">Sign Up</h1>  
          <Card className="card-log">
        < Button variant="success" onClick={openSignUpDriver} size="lg" className="button-log">
          I'm a Driver
         </Button>

         <Button variant="success" onClick={openSignUpPassenger} size="lg" className="button-log">
          I'm a Passenger
         </Button>
         </Card>

      </Col>
      <Col md={6} >

      <Image src={Signup} fluid alt="Image" className="signup-image" /> 
   

      </Col>
      </Row>
      <Footer/>
      </div>



  );
};

export default LoginPage;
 