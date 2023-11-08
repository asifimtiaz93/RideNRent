import React, {useState, useEffect} from "react";
import "../styles/commute_passenger.css";
import "../styles/Search_Passenger.css";
import logo from "../assets/Group.png"
import Car from "../assets/passenger.png"
import axios from "axios";
import Header2 from "./header2";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  ButtonGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";



export const Commute_Passenger = () => {

  const navigate=useNavigate();
  const openlogin = () => {
    navigate("/login");
  }
  const openloginpassenger = () => {
    navigate("/login_passenger");
  }
  const opensignup = () => {
    navigate("/signup");
  }
  const opensearchpassenger = () => {
    navigate("/search_passenger");
  }
  const openconstruction = () => {
    navigate("/construction");
  }
  const openlanding = () => {
    navigate("/");
  }
  const openChat =() =>{
    navigate("/chatWindow");
  }
  
  const [psngrId, setId] = useState("");

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
      const idp = response.data.passenger._id;
      console.log(idp);
      setId(idp); // Update the state with the passenger's name
    })
    .catch((error) => {
      // Handle errors, e.g., if the token is invalid
      console.error("Error fetching Driver data: ", error);
      navigate("/login"); // Redirect to login if there's an error
    });


}, []);

const [pickup, setPickup] = useState("");
const [destination, setDestination] = useState("");
const [seats, setseats] = useState("");
const [searchResults, setSearchResults] = useState([]);


// Define a function to handle booking a ride
const handleBookRide = (rideId) => {
  const token = localStorage.getItem("token");
  const passengerId = psngrId;

  if (!passengerId) {
    alert("You must be logged in as a passenger to book a ride.");
    return;
  }
  // Make an API request to update the Ride model as booked
  axios
    .post(`http://localhost:4000/bookride/${rideId}`, null, {
      headers: {
        Authorization: token,
      },
    })
    .then(() => {
      // Handle booking success, e.g., show a confirmation message
      alert("Ride booked successfully!");
    })
    .catch((error) => {
      console.error("Error booking ride: ", error);
      // Handle booking error, e.g., show an error message
      alert("Error booking ride. Please try again later.");
    });
};



// Define a function to handle chatting
const handleChat = (rideId) => {
  const token = localStorage.getItem("token");

  const passengerId = psngrId;

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


const [sortByFare, setSortByFare] = useState(false);
const [sortByRating, setSortByRating] = useState(false);

const handleSortByFare = () => {
  setSortByFare(true);
  setSortByRating(false);
};

const handleSortByRating = () => {
  setSortByRating(true);
  setSortByFare(false);
};

const handleSaveUser = (e) => {
  const data = {
    pickup,
    destination,
    seats,
  }


  axios
  .post("http://localhost:4000/searchrides", data)
  .then((response) => {
    const rides = response.data; // Assuming the response contains an array of matching rides
    //console.log(rides);
    setSearchResults(rides);
  })
  .catch((error) => {
    console.error("Error searching for rides: ", error);
  });
  };

  const sortedResults = [...searchResults];
  console.log(sortedResults);
  if (sortByFare) {
    sortedResults.sort((a, b) => a.fare - b.fare);
  }

  if (sortByRating) {
    sortedResults.sort((a, b) => b.driver.rating - a.driver.rating);
  }


  return (
    <Container className="passenger-commute">
      <Header2 />
      <Row>
        <Col md={6}>
        <h1 className="font-weight-bold text-4xl">Book A Commute!</h1>
      <Card className="border shadow-sm p-3 ">
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder="Boarding Point"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Destination Point"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="number"
              value={seats}
              onChange={(e) => setseats(e.target.value)}
              placeholder="Available Seats"
            />
          </Form.Group>
          <Card.Footer>
          <Button
            onClick={handleSaveUser}
            variant="success"
            size="lg"
            className="cust-btn"
            >
            Search
           
          </Button>
          </Card.Footer>

        </Form>
      </Card>


     
        </Col>

        <Col xs={1} >
        </Col>
        
        <Col className="right-col" >
        <Row >
       
        </Row>
        <Row>
        <Card className="search-result">

        <Card.Body>
          <h2 className="font-weight-bold text-lg">Search Results:</h2>
          <ButtonGroup className="bg-sort">
        <Button onClick={handleSortByFare} variant="success" >Sort by Fare</Button>
        <Button onClick={handleSortByRating} variant="success">Sort by Rating</Button>
        </ButtonGroup>
          <ul className="list-unstyled">
            {sortedResults.map((ride) => (
              <li key={ride._id} className="border border-success shadow mb-3">
                <strong>Driver: {ride.driver.fullName}</strong>
                <br />
                Pickup: {ride.pickup}, Destination: {ride.destination}, Time: {ride.time}, Status: {ride.status}, Rating: {ride.driver.rating}, Fare: {ride.fare}
                <br />
                <div className="d-flex justify-content-between">
                  {ride.status !== "Booked" && (
                    <Button
                      onClick={() => handleBookRide(ride._id)}
                      variant="success"
                      className="cust-btn"
                    >
                      Book
                    </Button>
                  )}
                  <Button onClick={() => handleChat(ride._id)} variant="outline-success" className="cust-btn">
                    Chat
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </Card.Body>
      </Card>
      </Row>
        </Col>
      </Row>
      
    
   
    </Container>
  );
};


export default Commute_Passenger;