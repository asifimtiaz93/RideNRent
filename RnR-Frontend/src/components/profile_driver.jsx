import React, {useState, useEffect} from "react";
import "../styles/Profile_Driver.css";
import Header_In from "./Header_In";
import pp from "../assets/pp.png"
import { useNavigate } from "react-router-dom";
import axios from "axios";


export const Profile_Driver = () => {

  const [driver, setDriver] = useState([]);
  const [driverRides, setDriverRides] = useState([]);
  const [file, setFile] = useState(null);
  const [nid, setNID] = useState(null);
  const [imageUrl, setImageUrl] = useState(""); 
  const [image, setImage] = useState(""); 
  const [nidImage, setnidImage] = useState("");
  const [rating, setRating] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
    .get("http://localhost:4000/profileDvr", {
      headers: {
        Authorization: token,
      },
    })
    .then((response) => {
      // Assuming your backend returns passenger information with a "fullName" field
      const driver = response.data.dvr;
      console.log(driver);
      setDriver(driver);
      setRating(driver.rating.toFixed(2));
      setImage(driver.image);
      setnidImage(driver.nid);
      
    }
    )
    .catch((error) => {
      // Handle errors, e.g., if the token is invalid
      console.error("Error fetching Driver data: ", error);
      navigate("/login"); // Redirect to login if there's an error
    });

     // Fetch the rides listed by the driver
   axios
   .get("http://localhost:4000/dvrRideHistory", {
     headers: {
       Authorization: token,
     },
   })
   .then((response) => {
     const rides = response.data;
     console.log(rides);
     setDriverRides(rides);
   })
   .catch((error) => {
     console.error("Error fetching driver's rides: ", error);
   });




}, []);

const handleFileChange = (e) => {
  const selectedFile = e.target.files[0];
  setFile(selectedFile);
};

const handleUploadImage = () => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("image", file);

  // Send the image to your backend
  axios
    .post("http://localhost:4000/uploadimgDvr", formData, {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      const uploadedImageUrl = response.data.imageUrl;
      setImageUrl(uploadedImageUrl);
      alert("Image uploaded successfully!");
    })
    .catch((error) => {
      console.error("Error uploading image: ", error);
      alert("Error uploading image. Please try again later.");
    });
};

//-------------NID Upload------------------
const handleNIDChange = (e) => {
  const selectedFile = e.target.files[0];
  setNID(selectedFile);
};

const handleUploadNID = () => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("image", nid);

  // Send the image to your backend
  axios
    .post("http://localhost:4000/uploadNidDvr", formData, {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {

      alert("NID uploaded successfully!");
    })
    .catch((error) => {
      console.error("Error uploading image: ", error);
      alert("Error uploading image. Please try again later.");
    });
};


  return (
    <div className="profile-page">

      <Header_In/>

      <div className="Profile_Frame">
        <div className="profile-info">
          <div className="profile-picture">
            <img className="PP" alt="Group" src={`http://localhost:4000/`+image} />
            </div>
           
            <br/>
          
          <div className="main_info">
            <h>{driver.fullName}</h>
            <br/>
            <h>Rating: {rating}</h>
            <br/>
          </div>
          <div className="user-details1">
          <h2>Personal Information</h2>
            <p>Email: {driver.email} </p>
            <p>Mobile No: {driver.mobile} </p>
            <p>License: {driver.licnum} </p>
            <p>Reg_no: {driver.vehnum} </p>
            <h2>Vehicle Information</h2>
            <p>Make: {driver.make}</p>
            <p>Model:{driver.model} </p>
            <p>Year: {driver.year} </p>
            <p>color: {driver.color} </p>
            {/* Add more user information here */}

            <div>
            <input type="file" accept="image/*" onChange={handleFileChange}></input>
            <button className="up-button" onClick={handleUploadImage} >
              Upload Image
            </button>
            </div>
            <br/>
            
            <div>
            <input type="file" accept="image/*" onChange={handleNIDChange}></input>
            <button className="up-button" onClick={handleUploadNID} >
              Upload NID
            </button>
            </div>
            <br/>
            <div className="nid-picture">
            <img className="nid" alt="NID" src={`http://localhost:4000/`+nidImage} />
            </div>
          </div>
          
        </div>
      </div>
      
      <div className="Ride_History">
        <h2>Ride History</h2>
          <ul>
            {driverRides.map((ride) => (
              <div className="Ride_Frame">
                <li>{ride.pickup} to {ride.destination} on {ride.time} at {ride.fare} BDT 
                <br/>
                Date: {ride.completionDate}
                <br/>
                Rating: {ride.review}
                <br/>
                </li>
              </div>
            ))}
          </ul>
      </div>
    </div>
  );
};

export default Profile_Driver;
