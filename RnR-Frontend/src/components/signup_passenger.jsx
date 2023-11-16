/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "../styles/signup_passenger.css";
import { Button, Container, Form, InputGroup, Col, Row, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import logo from "../assets/Group.png"
import Car from "../assets/ss.jpg"
import HeaderOut from "./header_out";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
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
  const [mobileError, setMobileError] = useState('');

  const validateMobile = (value) => {
    // Define the mobile number pattern using a regular expression
    const mobilePattern = /^01\d{9}$/;

    // Check if the value matches the pattern
    const isValidMobile = mobilePattern.test(value);

    // Set the error message based on the validation result
    setMobileError(isValidMobile ? '' : 'Invalid mobile number format');

    return isValidMobile;
  };
  const [emailError, setEmailError] = useState('');

  const validateEmail = (value) => {
    // Define the email pattern using a regular expression
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the value matches the email pattern
    const isValidEmail = emailPattern.test(value);

    // Set the error message based on the validation result
    setEmailError(isValidEmail ? '' : 'Invalid email format');

    return isValidEmail;
  };

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
    <Container>
    <div className="signup_passenger-page">

        <HeaderOut/>

      
      <Col>
      <Container className="signuppassenger-form-container">
      
   <Row><h2 className="signup_pass-form">Sign Up</h2>
   <Col xs={6} className="gen">
    
   <Form>
     <Form.Group controlId="fullname">
       <Form.Control
         type="text"
         required
         value={fullName}
         onChange={(e) => {setfullName(e.target.value);
           validateForm();
         }}
         placeholder="Full Name"
       />
     </Form.Group>
     
     <Form.Group controlId="email">

     <Form.Control
       type="text"
       value={email}
       onChange={(e) => {
         setemail(e.target.value);
         validateEmail(e.target.value);
       }}
       placeholder="Enter your email"
       isInvalid={!!emailError}
     />
     <Form.Control.Feedback type="invalid">{emailError}</Form.Control.Feedback>
   </Form.Group>

     <Form.Group controlId="mobile">
     <Form.Control
       type="tel"
       value={mobile}
       onChange={(e) => {
         setmobile(e.target.value);
         validateMobile(e.target.value);
       }}
       placeholder="Enter Mobile Number (e.g., 01234567890)"
       isInvalid={!!mobileError}
     />
     <Form.Control.Feedback type="invalid">{mobileError}</Form.Control.Feedback>
     </Form.Group>

     <Form.Group controlId="password">
       <Form.Control
         type="password"
         value={password}
         onChange={(e) => {setpassword(e.target.value);validateForm();
         }}
         placeholder="New Password"
       />
     </Form.Group>


   </Form>
   <Button onClick={handleSaveUser} variant="success" className="signup-butt" >
Sign Up
</Button>
   </Col>
  
   </Row>
 </Container>
      </Col>
      <Col>
      <Image src={Car} fluid alt="Image" className="signup-pass-image" /> 
      </Col>
    
    </div>
    
  </Container>
);
};

export default Signup_Passenger;