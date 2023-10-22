import React, { useState, useEffect } from "react";
import "../styles/dash_passenger.css";
import Header2 from "./header2";
import Signup from "../assets/driverpic.png"
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    <div className="driver-dashboard">
     
      <Header2/>

      <div className="drivertext">Passenger's ZONE!</div>

      <p className="driver_para">
      Welcome, {passengerName}!
        Join our community of commuters and
        <br />
        start sharing rides today for
        <br />
        a more affordable, eco-friendly and connected journey!
      </p>

      <div className="frame-23" onClick={openshareyourcommute} >
        <div className="text-wrapper-65">Find A Ride</div>
      </div>
      <div className="search-results">
        <h2>Booked Rides:</h2>
        <ul>
          {driverRides.map((data) => (
            <li key={data._id}>
              {/* Display ride information here */}
              <strong>Driver: {data.driver.fullName}</strong><br />
              From: {data.pickup}
              <br/>
              To: {data.destination}
              <br/>
              Time: {data.time}
              <br/>
              Mobile: {data.driver.mobile}
              
            </li>
          ))}
        </ul>
      </div>
      <div className="search-results">
        <h2>Ride History:</h2>
        <ul>
          {searchResults.map((data) => (
            <li key={data._id}>
              {/* Display ride information here */}
              <strong>Driver: {data.driver.fullName}</strong><br />
              Time: {data.time}
              <br/>
              Date: {formatDateString(data.completionDate)}
              <br/>
              {data.review === 0 ? (
          <div>
            <label>Give Review:</label>
            <select onChange={(e) => setReviewValue(e.target.value)}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select> Stars 
            <br/>
            <button onClick={() => handleReviewRide(data._id)} className="Review-button">Review</button>
              
          </div>
        ) : (
          <div>
            Review: {data.review}
          </div>
        )}
            </li>
          ))}
        </ul>
      </div>
      
      <img className="driverdashpic" alt="Element" src={Signup} />

    </div>
  );
};

export default PassDashboard;
