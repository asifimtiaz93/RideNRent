import React, { useState, useEffect } from "react";
import { Button, Card, Container, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header2 from "./header2";
import Signup from "../assets/driverpic2.png";
import "../styles/commute_driver.css";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const DriverCommute = () => {
  const navigate = useNavigate();

  const opendashpassenger = () => {
    navigate("/dash_passenger");
  };

  const opensearchdriver = () => {
    navigate("/search_driver");
  };

  const openlistyourcar = () => {
    navigate("/construction");
  };

  const [driver, setId] = useState("");
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [time, settime] = useState("");
  const [seats, setseats] = useState("");
  const [fare, setfare] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:4000/profileDvr", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        const dvrId = response.data.dvr._id;
        setId(dvrId);
      })
      .catch((error) => {
        console.error("Error fetching Driver data: ", error);
        navigate("/login");
      });
  }, []);

  const handleSaveUser = (e) => {
    const data = {
      driver,
      pickup,
      destination,
      time,
      seats,
      fare,
    };

    axios
      .post("http://localhost:4000/registerRide", data)
      .then(() => {
        console.log(data);
        toast.success("Ride Listed Successfully!")
        navigate("/dash_driver");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <h2 className="drivertext2">Share Your Ride !</h2>
      <Row>
        <Col>
        <Header2 />
      
      <Card className="commute-driver-form pb-20 ">
        <Card.Body>
          <Form>
          <Form.Group controlId="pickup">
  
  <Form.Select
    value={pickup}
    onChange={(e) => setPickup(e.target.value)}
    className="w-4/50 h-7 p-2 text-base"
    style={{ padding: '8px', marginBottom: '8px' }}
  >
    <option value="">Select Pickup Location</option>
    <option value="Mirpur - 1">Mirpur 1</option>
    <option value="Mirpur - 10">Mirpur - 10</option>
    <option value="Mirpur - 12">Mirpur - 12</option>
    <option value="Mirpur - 11">Mirpur - 11</option>
    <option value="Mirpur - 14 ">Mirpur - 14</option>
    <option value="Mirpur - 6">Mirpur - 6</option>
    <option value="Pallabi">Pallabi</option>
    <option value="Dhanmondi">Dhanmondi</option>
    <option value="Gulshan">Gulshan</option>
    <option value="Uttara">Uttara</option>
    <option value="Banani">Banani</option>
    <option value="Mohakhali">Mohakhali</option>
  </Form.Select>
</Form.Group>

<Form.Group controlId="destination">
  
  <Form.Select
    value={destination}
    onChange={(e) => setDestination(e.target.value)}
    className="w-4/50 h-7 p-2 text-base"
    style={{ padding: '8px', marginBottom: '8px' }}
  >
    <option value="">Select Destination Location</option>
    <option value="Mirpur - 1">Mirpur 1</option>
    <option value="Mirpur - 10">Mirpur - 10</option>
    <option value="Mirpur - 12">Mirpur - 12</option>
    <option value="Mirpur - 11">Mirpur - 11</option>
    <option value="Mirpur - 14 ">Mirpur - 14</option>
    <option value="Mirpur - 6">Mirpur - 6</option>
    <option value="Pallabi">Pallabi</option>
    <option value="Dhanmondi">Dhanmondi</option>
    <option value="Gulshan">Gulshan</option>
    <option value="Uttara">Uttara</option>
    <option value="Banani">Banani</option>
    <option value="Mohakhali">Mohakhali</option>
  </Form.Select>
</Form.Group>

            <Form.Group controlId="time">
              <Form.Control
                type="time"
                value={time}
                onChange={(e) => settime(e.target.value)}
                placeholder="Time"
                className="w-4/50 h-7 p-2 text-base"
              />
            </Form.Group>

            <Form.Group controlId="seats">
              <Form.Control
                type="number"
                value={seats}
                onChange={(e) => setseats(e.target.value)}
                placeholder="Available Seats"
                className="w-4/50 h-7 p-2 text-base"
              />
            </Form.Group>

            <Form.Group controlId="fare">
              <Form.Control
                type="number"
                value={fare}
                onChange={(e) => setfare(e.target.value)}
                placeholder="Asking Fare"
                className="w-4/50 h-7 p-2 text-base"
              />
            </Form.Group>

            <Button
              onClick={handleSaveUser}
              className="bg-green-700 text-white p-2 px-6 text-xl rounded my-32 mx-3"
              style={{ position: "static" }}
            >
              List Ride
            </Button>
          </Form>
        </Card.Body>
      </Card>
        </Col>
        <Col>
        <img className="driverdashpic" alt="Element" src={Signup} />
        </Col>
      </Row>
     
     
    </Container>
  );
};

export default DriverCommute;
