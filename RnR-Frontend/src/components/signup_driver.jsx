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
                onChange={(e) => {setEmail(e.target.value); validateForm();
                }}
                placeholder="Email"
              />
            </Form.Group>

            <Form.Group controlId="mobile">
              <Form.Control
                type="tel"
                value={mobile}
                onChange={(e) => {setMobile(e.target.value); validateForm();
                }}
                placeholder="Phone Number"
              />
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
                onChange={(e) => {setVehNum(e.target.value); validateForm();
                }}
                placeholder="Veh Reg Number ex: DHAKA-D-11-9999"
              />
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
        style={{ padding: '8px' }}
      >
        <option>Select Make</option>
        <option value="Toyota">Toyota</option>
        <option value="Honda">Honda</option>
        <option value="Ford">Ford</option>
        {/* Add more options based on available makes */}
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
        style={{ padding: '8px' }}
      >
        <option>Select Model</option>
        <option value="Camry">Camry</option>
        <option value="Accord">Accord</option>
        <option value="Focus">Focus</option>
        {/* Add more options based on available models */}
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
