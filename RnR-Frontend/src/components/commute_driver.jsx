import React, { useState, useEffect} from "react";
import "../styles/commute_driver.css";
import Header2 from "./header2";
import Signup from "../assets/driverpic2.png"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const DriverCommute = () => {
  
  const navigate=useNavigate();
  const opendashpassenger = () => {
    navigate("/dash_passenger");
  }
  const opensearchdriver = () => {
    navigate("/search_driver");
  }
  const openlistyourcar = () => {
    navigate("/construction");
  }

  const [driver, setId] = useState("");

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
        const dvrId = response.data.dvr._id;
        console.log(dvrId);
        setId(dvrId); // Update the state with the passenger's name
      })
      .catch((error) => {
        // Handle errors, e.g., if the token is invalid
        console.error("Error fetching Driver data: ", error);
        navigate("/login"); // Redirect to login if there's an error
      });
  }, []);
 
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [time, settime] = useState("");
  const [seats, setseats] = useState("");
  const [fare, setfare] = useState("");

  const handleSaveUser = (e) => {
    const data = {
      driver,
      pickup,
      destination,
      time,
      seats,
      fare,
    }; 
    console.log(data);
  
    axios
      .post('http://localhost:4000/registerRide', data)
      .then(() => {
        console.log(data);
        navigate('/dash_driver');
      })
      .catch((err) => {
        console.log(err);
      });
    };


    

  return (
    <div className="driver-commute">
     
    <Header2/>

    <div className="drivertext2">Share Your COMMUTE!</div>

    <div className="commute-driver-form pb-20" >

    <input type="text" 
    value={pickup}
    onChange={(e) => setPickup(e.target.value)}
     id="pickup" placeholder="Boarding Point" 
     className="w-4/50 h-7 p-2  text-base"
     />
   <br/>
   <input type="text" 
    value={destination}
    onChange={(e) => setDestination(e.target.value)}
    id="destination" placeholder="Destination Point" 
    className="w-4/50 h-7 p-2  text-base"
    />
  <br/>
    <input type="time" 
    value={time}
    onChange={(e) => settime(e.target.value)}
    id="time" placeholder="Time" 
    className="w-4/50 h-7 p-2  text-base"
    />
 <br/>
    <input type="number"
    value={seats}
    onChange={(e) => setseats(e.target.value)}
    id="seats" placeholder="Availabe Seats" 
    className="w-4/50 h-7 p-2  text-base"
    />
 <br/>
    <input type="number" 
    value={fare}
    onChange={(e) => setfare(e.target.value)}
    id="fare" placeholder="Asking Fare" 
    className="w-4/50 h-7 p-2  text-base"
    />
 <br/>

 <button onClick={handleSaveUser} className="bg-green-700 text-white p-2 px-6 text-xl rounded my-32 mx-3">List Ride</button>
 
 </div>  
      <img className="driverdashpic" alt="Element" src={Signup} />
    
    </div>
  );
};

export default DriverCommute;
