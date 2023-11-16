import React, { useEffect, useState } from "react";
import "../styles/signup_driver.css";
import { Button, Container, Form, InputGroup, Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../assets/Group.png";
import Car from "../assets/driver.png";
import axios from "axios";
import HeaderOut from "./header_out";
import { useNavigate } from "react-router-dom";

export const Signup_Driver = () => {
  const navigate = useNavigate();

  const openlogin = () => {
    navigate("/login");
  };
  const opensignup = () => {
    navigate("/signup");
  };
  const openconstruction = () => {
    navigate("/construction");
  };
  const openlanding = () => {
    navigate("/");
  };

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [vehNum, setVehNum] = useState("");
  const [licNum, setLicNum] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [capacity, setCapacity] = useState("");
  const [year, setYear] = useState("");
  const [color, setColor] = useState("");
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
  const [vehNumError, setVehNumError] = useState('');

  const validateVehNum = (value) => {
    // Define the vehicle registration number pattern using a regular expression
    const vehNumPattern = /^[A-Z]+-[A-Z]-\d{2}-\d{4}$/;

    // Check if the value matches the pattern
    const isValidVehNum = vehNumPattern.test(value);

    // Set the error message based on the validation result
    setVehNumError(isValidVehNum ? '' : 'Invalid vehicle registration number format');

    return isValidVehNum;
  };
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
  const carMakes = [
    'ALFA ROMEO', 'Aston Martin Lagonda Ltd', 'Audi', 'BMW', 'Chevrolet', 'Dodge',
    'Ferrari', 'Honda', 'Jaguar', 'Lamborghini', 'MAZDA', 'McLaren', 'Mercedes-Benz',
    'NISSAN', 'Pagani Automobili S.p.A.', 'Porsche', 'FIAT', 'Mini', 'SCION', 'Subaru',
    'Bentley', 'Buick', 'Ford', 'HYUNDAI MOTOR COMPANY', 'LEXUS', 'MASERATI', 'Roush',
    'Volkswagen', 'Acura', 'Cadillac', 'INFINITI', 'KIA MOTORS CORPORATION',
    'Mitsubishi Motors Corporation', 'Rolls-Royce Motor Cars Limited', 'TOYOTA',
    'Volvo', 'Chrysler', 'Lincoln', 'GMC', 'RAM', 'CHEVROLET', 'Jeep', 'Land Rover'
  ];

  const carModels = [
    '4Runner', '86', 'Avalon', 'Avalon Hybrid', 'Camry', 'Camry Hybrid', 'C-HR', 'Corolla',
    'Corolla Hatchback', 'Corolla Hybrid', 'GR Supra', 'Highlander', 'Highlander Hybrid',
    'Land Cruiser', 'Mirai', 'Prius', 'Prius Prime', 'RAV4', 'RAV4 Hybrid', 'Sequoia', 'Sienna',
    'Tacoma Access Cab', 'Tacoma Double Cab', 'Tundra CrewMax', 'Tundra Double Cab', 'Yaris', 'Yaris Hatchback'
  ];

  const handleSaveUser = (e) => {
   
      const data = {
        fullName,
        email,
        mobile,
        password,
        vehNum,
        licNum,
        make,
        model,
        capacity,
        year,
        color,
      };
      console.log(data);

      axios
        .post("http://localhost:4000/registerDvr", data)
        .then(() => {
          navigate("/login");
        })
        .catch((err) => {
          console.log(err);
        });
 
   
  };

  return (
    <Container>
      <div className="signup_driver-page">

          <HeaderOut/>

        <h2 className="signup_driver-form">Sign Up</h2>

        <Container className="signupdriver-form-container">
          <h2 className="px-7">General Information</h2>
          <Row>
          <Col xs={6} className="gen">
          <Form>
            <Form.Group controlId="fullname">
              <Form.Control
                type="text"
                required
                value={fullName}
                onChange={(e) => {setFullName(e.target.value);
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
                setEmail(e.target.value);
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
                setMobile(e.target.value);
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
                onChange={(e) => {setPassword(e.target.value);validateForm();
                }}
                placeholder="New Password"
              />
            </Form.Group>

           <Form.Group controlId="vehNum">
           <Form.Control
              type="text"
              value={vehNum}
              onChange={(e) => {
                setVehNum(e.target.value);
                validateVehNum(e.target.value);
              }}
              placeholder="Enter Veh Reg Number (e.g., ABC-D-11-9999)"
              isInvalid={!!vehNumError}
            />
            <Form.Control.Feedback type="invalid">{vehNumError}</Form.Control.Feedback>
            </Form.Group> 

            <Form.Group controlId="licNum">
              <Form.Control
                type="text"
                value={licNum}
                onChange={(e) => {setLicNum(e.target.value); validateForm();
                }}
                placeholder="License Number"
              />
            </Form.Group>
          </Form>
          </Col>

          <Col xs={6} className="veh">
  <h2 className="tw-text-3xl">Vehicle Information</h2>
  <Form>
    <Form.Group controlId="make">
      <Form.Select
        aria-label="Select Make"
        value={make}
        onChange={(e) => {
          setMake(e.target.value);
          validateForm();
        }}
        style={{ padding: '6px', marginBottom: '8px' }}
      >
        <option>Select Make</option>
        {carMakes.map((carMake, index) => (
          <option key={index} value={carMake}>
            {carMake}
          </option>
        ))}
      </Form.Select>
    </Form.Group>

    <Form.Group controlId="model">
      <Form.Select
        aria-label="Select Model"
        value={model}
        onChange={(e) => {
          setModel(e.target.value);
          validateForm();
        }}
        style={{ padding: '8px', marginBottom: '8px' }}
      >
        <option>Select Model</option>
        {carModels.map((carModel, index) => (
      <option key={index} value={carModel}>
        {carModel}
      </option>
    ))}
   
      </Form.Select>
    </Form.Group>

    <Form.Group controlId="color">
      <Form.Control
        type="text"
        value={color}
        onChange={(e) => {
          setColor(e.target.value);
          validateForm();
        }}
        placeholder="Color"
      />
    </Form.Group>

    <Form.Group controlId="year">
      <Form.Control
        type="number"
        value={year}
        onChange={(e) => {
          setYear(e.target.value);
          validateForm();
        }}
        placeholder="Year"
      />
    </Form.Group>

    <Form.Group controlId="capacity">
      <Form.Control
        type="number"
        value={capacity}
        onChange={(e) => {
          setCapacity(e.target.value);
          validateForm();
        }}
        placeholder="Capacity"
      />
    </Form.Group>
  </Form>
  <Form.Group controlId="acceptTerms">
    <Form.Check
      type="checkbox"
      label="I accept the terms and conditions"

    />
  </Form.Group>
  <Button onClick={handleSaveUser} variant="success" className="signup-butt" >
    Sign Up
  </Button>
</Col>

          </Row>
        </Container>
      </div>
    </Container>
  );
};

export default Signup_Driver;
