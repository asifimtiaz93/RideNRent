import React, {useState, useEffect} from "react";
import "../styles/commute_passenger.css";
import "../styles/Search_Passenger.css";
import logo from "../assets/Group.png"
import Car from "../assets/passenger.png"
import axios from "axios";
import Header2 from "./header2";

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
    <div className="passenger-commute">
     

      <Header2/>

      <div className="drivertext2">Book A Commute!</div>

      <div className="commute-passenger-form">

      <input type="text"
    value={pickup}
    onChange={(e) => setPickup(e.target.value)}
     id="pickup" placeholder="Boarding Point" />
   <br/>
   <input type="text" 
    value={destination}
    onChange={(e) => setDestination(e.target.value)}
    id="destination" placeholder="Destination Point" />
  <br/>
    <input type="number"
    value={seats}
    onChange={(e) => setseats(e.target.value)}
    id="seats" placeholder="Availabe Seats" />
  <br/>
      <button onClick={handleSaveUser} className="commutedriver-button">Search</button>

        
        
        <img className="main-image" alt="Main image" src={Car} />
        

        
      </div>
      

      <div className="search-frame2">
        <h2>Search Results:</h2>
        <div>
          <button onClick={handleSortByFare} className="sort-button">
            Sort by Fare
          </button>
          <br/>
          <button onClick={handleSortByRating} className="sort-button">
            Sort by Rating
          </button>
        </div>
        <ul>
          {sortedResults.map((ride) => (
            <li key={ride._id}>
              {/* Display ride information here */}
              <strong>Driver: {ride.driver.fullName}</strong><br />
              Pickup: {ride.pickup}, Destination: {ride.destination}, Time: {ride.time}, Status: {ride.status}, Rating: {ride.driver.rating}, Fare: {ride.fare}
              <br/>
              
              {ride.status !== "Booked" && (
          <button onClick={() => handleBookRide(ride._id)} className="book-button">
            Book
          </button>
        )}
            </li>
          ))}
        </ul>
      </div>


    </div>
  );
};

export default Commute_Passenger;