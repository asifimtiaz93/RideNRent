import React, {useState, useEffect} from "react";
import "../styles/dash_driver.css"
import Header2 from "./header2";
import Signup from "../assets/driverpic.png"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import chatWindow from "./chatWindow";
import { Container, Row, Col, Button, Card, Image } from 'react-bootstrap';
import "bootstrap/dist/css/bootstrap.min.css"
import Placeholder from 'react-bootstrap/Placeholder';
export const DriverDashboard = () => {
  
  const navigate=useNavigate();
  const [dvrName, setDvrName] = useState("");
  const [driverRides, setDriverRides] = useState([]);

  useEffect(() => {
    // Fetch passenger information using the JWT token
    const token = localStorage.getItem("token");
    //console.log(token);
   
    axios
      .get("http://localhost:4000/profileDvr", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        // Assuming your backend returns passenger information with a "fullName" field
        const fullName = response.data.dvr.fullName;
        const driverId = response.data.dvr._id;
        localStorage.setItem("driverid",driverId);
        console.log(fullName);

//        
        setDvrName(fullName); // Update the state with the passenger's name
      })
      .catch((error) => {
        // Handle errors, e.g., if the token is invalid
        console.error("Error fetching Driver data: ", error);
        navigate("/login"); // Redirect to login if there's an error
      });



   // Fetch the rides listed by the driver
   axios
   .get("http://localhost:4000/driverRides", {
     headers: {
       Authorization: token,
     },
   })
   .then((response) => {
     const rides = response.data;
     setDriverRides(rides);
   })
   .catch((error) => {
     console.error("Error fetching driver's rides: ", error);
   });


   
}, []);

const handleCompleteRide = (rideId) => {
  const token = localStorage.getItem("token");
  // Make an API request to update the ride's status to "Completed"
  axios
    .put(`http://localhost:4000/completeRide/${rideId}`, null, {
      headers: {
        Authorization: token,
      },
    })
    .then(() => {
      // Update the ride's status to "Completed" on the frontend
      const updatedRides = driverRides.map((ride) => {
        if (ride._id === rideId) {
          ride.status = "Completed";
        }
        return ride;
      });
      setDriverRides(updatedRides);
      // Handle completion success, e.g., show a confirmation message
      alert("Ride completed successfully!");
    })
    .catch((error) => {
      console.error("Error completing ride: ", error);
      // Handle completion error, e.g., show an error message
      alert("Error completing ride. Please try again later.");
    });
};

const handleAvailableRide = (rideId) => {
  const token = localStorage.getItem("token");
  // Make an API request to update the ride's status to "Completed"
  axios
    .put(`http://localhost:4000/availableRide/${rideId}`, null, {
      headers: {
        Authorization: token,
      },
    })
    .then(() => {
      // Update the ride's status to "Completed" on the frontend
      const updatedRides = driverRides.map((ride) => {
        if (ride._id === rideId) {
          ride.status = "Available";
        }
        return ride;
      });
      setDriverRides(updatedRides);
      // Handle completion success, e.g., show a confirmation message
      alert("Ride made available again!");
    })
    .catch((error) => {
      console.error("Error completing ride: ", error);
      // Handle completion error, e.g., show an error message
      alert("Error completing ride. Please try again later.");
    });
};

const handleDeleteRide = (rideId) => {
  const token = localStorage.getItem("token");
  // Make an API request to update the ride's status to "Completed"
  axios
    .delete(`http://localhost:4000/deleteRide/${rideId}`, null, {
      headers: {
        Authorization: token,
      },
    })

    .then(() => {
      alert("Ride deleted");
    })
    .catch((error) => {
      console.error("Error deleting ride: ", error);
      // Handle completion error, e.g., show an error message
      alert("Ride Deleted Successfully");
    });
};

  const openshareyourcommute = () => {
    navigate("/commute_driver");
  }
  const openlistyourcar = () => {
    navigate("/construction");
  }

  const notification = () => {
    navigate("/Notification");
    
  }

  return (
    <Container className="driver-dashboard">
      <Row>
        {/* Left Column */}
        <Col md={8}>
          <Header2 />
          <h1 className="headline">Driver's ZONE!</h1>
          <Card>
            <Card.Body>
              <Card.Header className="display-6">
              Welcome, {dvrName}! 
              </Card.Header>
              <Card.Text className="driver-para" >
              Reduce your daily commute costs and
 
              connect with fellow travelers. <br/>

              Share your commute today for a greener,

              more efficient journey!
              </Card.Text>

         
            <Button onClick={openshareyourcommute} size="lg" variant="primary" className="custom-button">
            List Your Ride
          </Button>
          <Button onClick={notification} size="lg" variant="primary" className="custom-button2">
            Chats
          </Button>
          </Card.Body>
      
          </Card>

    

          <div className="">
            <h2>Your Listed Rides:</h2>
            <Row>
              {driverRides.map((ride) => (
                <Col key={ride._id}>
                  <Card className="search">
                    <Card.Body>
                      <Card.Title className="mb-2">Pickup: {ride.pickup}</Card.Title>
                      <Card.Title className="mb-2">Destination: {ride.destination}</Card.Title>
                      <Card.Text>
                        Time: {ride.time}
                        <br />
                        Status: {ride.status}
                      </Card.Text>
                      {ride.status === "Booked" && (
                        <Button onClick={() => handleCompleteRide(ride._id)} variant="success" className="comp-butt">
                          Complete
                        </Button>
                      )}
                      {ride.status === "Completed" && (
                        <Button onClick={() => handleAvailableRide(ride._id)} variant="warning" className="av-butt" >
                          Make Available
                        </Button>
                      )}
                      <Button onClick={() => handleDeleteRide(ride._id)} variant="danger" className="del-butt"> 
                        Delete Ride
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
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

export default DriverDashboard;
