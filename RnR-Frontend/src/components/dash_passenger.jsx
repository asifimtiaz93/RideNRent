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
  const [passengerId, setPassengerId] = useState([]);
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
        const passengerId = response.data.passenger._id;
        const fullName = response.data.passenger.fullName;
        console.log(fullName);
        console.log(passengerId);

        setPassengerName(fullName); // Update the state with the passenger's name
        setPassengerId(passengerId);
      })
      .catch((error) => {
        // Handle errors, e.g., if the token is invalid
        console.error("Error fetching passenger data: ", error);
        navigate("/login"); // Redirect to login if there's an error
      });
  }, []);

  
// Define a function to handle chatting
const handleChat = (rideId) => {
  const token = localStorage.getItem("token");
  if (!passengerId) {
    alert("You must be logged in as a passenger to book a ride.");
    return;
  }
  // Make an API request to update the Ride model as booked
  axios
    .post(`http://localhost:4000/chatWindow/${rideId}`, null, {
      headers: {
        Authorization: token,
      },
    })
    .then(() => {
      localStorage.setItem("rideid", rideId);
      localStorage.setItem("passengerid", passengerId);
      navigate("/chatWindow"); // Redirect to chat window
    }
    )
    .catch((error) => {
      console.error("Error handling chat: ", error);
      // Handle booking error, e.g., show an error message
      alert("Error handling chat.");
    });
};


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






<div>
  <h2>Booked Rides:</h2>
  {driverRides.map((data) => (
    <Card key={data._id} className="mb-2">
      <Card.Body>
        <Card.Title>Driver: {data.driver.fullName}</Card.Title>
        <Card.Text>
          From: {data.pickup}
          <br />
          To: {data.destination}
          <br />
          Time: {data.time}
          <br />
          Mobile: {data.driver.mobile}
        </Card.Text>
        <Button variant="primary" onClick={() => handleChat(data._id)} className="chat-butt">Chat</Button>
      </Card.Body>
    </Card>
  ))}
</div>


<div className="search-results">
  <h2>Ride History:</h2>
  {searchResults.map((data) => (
    <Card key={data._id} className="mb-3">
      <Card.Body>
        <Card.Title>
          <strong>Driver: {data.driver.fullName}</strong>
        </Card.Title>
        <Card.Text>
          Time: {data.time}<br />
          Date: {formatDateString(data.completionDate)}
        </Card.Text>
        {data.review === 0 ? (
          <div>
            <label>Give Review:</label>
            <div className="d-flex align-items-center" style={{ width: '2.5cm' }}>
              <Form.Select onChange={(e) => setReviewValue(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Form.Select>
              <span className="ml-2">Stars</span>
              <Button onClick={() => handleReviewRide(data._id)} variant="primary" className="rev-butt">
               Submit Review
              </Button>
            </div>
          </div>
        ) : (
          <div>Review: {data.review}</div>
        )}
      </Card.Body>
    </Card>
  ))}
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
