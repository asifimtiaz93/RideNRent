import React from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Group.png"
import Main from "../assets/Main.jpg"
import left from "../assets/left.svg"
import right from "../assets/right.svg"
import Footer from "./Footer";
const HowItWorks = () => {
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
<Container className="py-5">
  <header className="header">
    <div className="group-2">
      <button  className="text-wrapper">RideNRent</button>
      <img className="group-3" alt="Group" src={logo} />
    </div>
    <div className="menu"> 
      <button onClick={faq} className="text-wrapper-3">How it works</button>
      <button onClick={openlogin} className="text-wrapper-4">Log In</button>
      <button onClick={opensignup} className="text-wrapper-5">Sign Up</button>
    </div>
  </header>
  <h1 className="mb-4">How It Works</h1>
  <Row>
    <Col md={6}>
      <Card>
        <Card.Header>For Passengers</Card.Header>
        <Card.Body>
          <Card.Title>Step 1: Sign Up</Card.Title>
          <Card.Text>
            Register for an account as a passenger to start using the app.
          </Card.Text>
          <Card.Title>Step 2: Log In</Card.Title>
          <Card.Text>
            Log in to your account using your registered email address and password.
          </Card.Text>
          <Card.Title>Step 3: Set Up Your Profile</Card.Title>
          <Card.Text>
            Complete your profile by adding a profile picture and verifying your mobile number.
          </Card.Text>
          <Card.Title>Step 4: Search for Rides</Card.Title>
          <Card.Text>
            Use the app's search feature to find available rides in your area.
          </Card.Text>
          <Card.Title>Step 5: Book a Ride</Card.Title>
          <Card.Text>
            Select a ride that suits your preferences and confirm the booking.
          </Card.Text>
          <Card.Title>Step 6: Enjoy the Ride</Card.Title>
          <Card.Text>
            Meet your driver at the designated location and enjoy a comfortable ride to your destination.
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
    <Col md={6}>
      <Card>
        <Card.Header>For Drivers</Card.Header>
        <Card.Body>
          <Card.Title>Step 1: Sign Up</Card.Title>
          <Card.Text>
            Create a driver account to offer rides and earn money.
          </Card.Text>
          <Card.Title>Step 2: Profile Verification</Card.Title>
          <Card.Text>
            Wait for your profile and documents to be verified by the RideNRent team. This may take some time.
          </Card.Text>
          <Card.Title>Step 3: Set Availability</Card.Title>
          <Card.Text>
            Set your availability to let passengers know when you are ready to offer rides.
          </Card.Text>
          <Card.Title>Step 4: Accept Ride Requests</Card.Title>
          <Card.Text>
            Receive ride requests from passengers in your area and review details.
          </Card.Text>
          <Card.Title>Step 5: Confirm and Pick Up</Card.Title>
          <Card.Text>
            Accept the ride request if it fits your schedule and route. Navigate to the passenger's location for pick-up.
          </Card.Text>
          <Card.Title>Step 6: Provide a Safe Ride</Card.Title>
          <Card.Text>
            Greet the passenger and ensure a safe and comfortable journey. Follow navigation instructions to reach the destination.
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  </Row>
  <Row className="mt-5">
    <Col>
      <Card>
        <Card.Header>Key Features</Card.Header>
        <Card.Body>
          <Card.Title>Passenger Features</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item>Search and book rides.</ListGroup.Item>
            <ListGroup.Item>Sort rides according to rate or ratings.</ListGroup.Item>
            <ListGroup.Item>View ride history and reviews.</ListGroup.Item>
            <ListGroup.Item>Set preferences for a personalized experience.</ListGroup.Item>
            <ListGroup.Item>In app chat feature to communicate with driver.</ListGroup.Item>
            {/* Add more passenger features */}
          </ListGroup>
          <Card.Title className="mt-4">Driver Features</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item>List your rides and set availability.</ListGroup.Item>
            <ListGroup.Item>Manage your ride schedule and earnings.</ListGroup.Item>
            <ListGroup.Item>Receive ratings and reviews from passengers.</ListGroup.Item>
            <ListGroup.Item>Manage your rides, including update and delete.</ListGroup.Item>
            {/* Add more driver features */}
          </ListGroup>
        </Card.Body>
      </Card>
    </Col>
  </Row>
  <Footer/>
</Container>


  );
};

export default HowItWorks;
