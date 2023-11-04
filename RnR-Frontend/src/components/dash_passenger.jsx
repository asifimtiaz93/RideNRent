import React, { useState, useEffect } from "react";
import "../styles/dash_passenger.css";
import Header2 from "./header2";
import Signup from "../assets/driverpic.png"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Card, Form, Image } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export const PassDashboard = () => {
  
  const navigate=useNavigate();
  const [passengerName, setPassengerName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [driverRides, setDriverRides] = useState([]);
  useEffect(() => {
    // Fetch passenger information using the JWT token
    const token = localStorage.getItem("token");
    //console.log(token);
    axios
      .get("http://localhost:4000/searchridehistory", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        // Assuming your backend returns passenger information with a "fullName" field
        const data = response.data;
        console.log(data);
        setSearchResults(data);

      })
      .catch((error) => {
        // Handle errors, e.g., if the token is invalid
        console.error("Error fetching passenger data: ", error);
        navigate("/login"); // Redirect to login if there's an error
      });


      
    axios
    .get("http://localhost:4000/searchBookedRide", {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => {
      // Assuming your backend returns passenger information with a "fullName" field
      const data = response.data;
        console.log(data);
        setDriverRides(data);
   
    })
    .catch((error) => {
      // Handle errors, e.g., if the token is invalid
      console.error("Error fetching Driver data: ", error);
      navigate("/login"); // Redirect to login if there's an error
    });
  }, []);


  useEffect(() => {

    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:4000/profilePsngr", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        // Assuming your backend returns passenger information with a "fullName" field
        const fullName = response.data.passenger.fullName;
        console.log(fullName);

        setPassengerName(fullName); // Update the state with the passenger's name
      })
      .catch((error) => {
        // Handle errors, e.g., if the token is invalid
        console.error("Error fetching passenger data: ", error);
        navigate("/login"); // Redirect to login if there's an error
      });
  }, []);
  const openshareyourcommute = () => {
    navigate("/commute_passenger");
  }
  const openlistyourcar = () => {
    navigate("/construction");
  }


  function formatDateString(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }


  const [reviewValue, setReviewValue] = useState("");

  const handleReviewRide = (dataId) => {
    const token = localStorage.getItem("token");

    // Make an API request to update the ride's status to "Reviewed"
    axios
      .put(`http://localhost:4000/ReviewRide/${dataId}`, { review: reviewValue }, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {

        // Handle review success, e.g., show a confirmation message
        alert("Ride Reviewed successfully!");

        window.location.reload();
      })
      .catch((error) => {
        console.error("Error reviewing ride: ", error);
        // Handle review error, e.g., show an error message
        alert("Error reviewing ride. Please try again later.");
      });
  };

  return (
    <Container className="driver-dashboard">
      <Row>
        <Col md={8}>
        <Header2 />
  
  <h1 className="drivertext">Passenger's ZONE!</h1>
    <Card className="greet">
    <Card.Header>
    Welcome, {passengerName}! 
    </Card.Header>
    <Card.Text>
    Join our community of commuters and

    start sharing rides today for

    a more affordable, eco-friendly, and connected journey!
    </Card.Text>
    <Button
    onClick={openshareyourcommute}
    variant="primary"
    size="lg"
    className="find-button"
  >
    Find A Ride
  </Button>

    </Card>




  <div className="">
    <h2>Booked Rides:</h2>
    <ul>
      {driverRides.map((data) => (
        <li key={data._id}>
          <strong>Driver: {data.driver.fullName}</strong>
          <br />
          From: {data.pickup}
          <br />
          To: {data.destination}
          <br />
          Time: {data.time}
          <br />
          Mobile: {data.driver.mobile}
        </li>
      ))}
    </ul>
  </div>

  <div className="search-results">
    <h2>Ride History:</h2>
    <ul className="list-group">
      {searchResults.map((data) => (
        <li key={data._id}>
          <strong>Driver: {data.driver.fullName}</strong>
          <br />
          Time: {data.time}
          <br />
          Date: {formatDateString(data.completionDate)}
          <br />
          {data.review === 0 ? (
            <div>
              <label>Give Review:</label>
              <Form.Select
                onChange={(e) => setReviewValue(e.target.value)}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Form.Select>
              Stars
              <br />
              <Button
                onClick={() => handleReviewRide(data._id)}
                variant="primary"
              >
                Review
              </Button>
            </div>
          ) : (
            <div>Review: {data.review}</div>
          )}
        </li>
      ))}
    </ul>
  </div>

        </Col>
         {/* Right Column */}
         <Col md={4}>
          <Image src={Signup} fluid roundedCircle />
        </Col>
      </Row>
     
    </Container>
  );
  
};

export default PassDashboard;
