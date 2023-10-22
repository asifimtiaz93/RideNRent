import React, {useState, useEffect} from "react";
import "../styles/dash_driver.css";
import Header2 from "./header2";
import Signup from "../assets/driverpic.png"
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  return (
    <div className="driver-dashboard">
     
      <Header2/>

      <div className="drivertext">Driver's ZONE!</div>

      <p className="driver_para">
      Welcome, {dvrName}!
        Reduce your daily commute costs and 
        <br />
        connect with fellow travelers.
        <br />
        Share your commute today for a greener,
        <br/>
        more efficient journey!
      </p>

      <div className="frame-23" onClick={openshareyourcommute} >
        <div className="text-wrapper-63">List Your Ride</div>
      </div>
      
      <img className="driverdashpic" alt="Element" src={Signup} />
      
      <div className="search-results">
        <h2 >Your Listed Rides:</h2>
        <ul>
          {driverRides.map((ride) => (
            <li key={ride._id}>
              Pickup: {ride.pickup}
              <br/>
              Destination: {ride.destination}
              <br/>
               Time: {ride.time}
               <br/>
              Status: {ride.status}
              {ride.status === "Booked" && (
        <button onClick={() => handleCompleteRide(ride._id)} className="complete-button">Complete</button>
      )}
      {ride.status === "Completed" && (
        <button onClick={() => handleAvailableRide(ride._id)} className="complete-button">Make Available</button>
      )}
       <button onClick={() => handleDeleteRide(ride._id)} className="delete-button">Delete Ride</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DriverDashboard;
