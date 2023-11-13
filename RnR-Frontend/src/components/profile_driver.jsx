import React, {useState, useEffect} from "react";
import "../styles/Profile_Driver.css";
import Header_In from "./Header_In";
import pp from "../assets/pp.png"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Button,
  Form,
  ButtonGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

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

      const driver = response.data.dvr;
      console.log(driver);
      setDriver(driver);
      setRating(driver.rating.toFixed(2));
      setImage(driver.image);
      setnidImage(driver.nid);
      
    }
    )
    .catch((error) => {

      console.error("Error fetching Driver data: ", error);
      navigate("/login"); // Redirect to login if there's an error
    });

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
function formatDateString(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

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

    <Container className="profile-page">

      <Header_In/>
      <Row>
        <Col className="Profile_Frame">
     
        <div className="profile-info">
          <div className="profile-picture">
            <img className="PP" alt="Group" src={`http://localhost:4000/`+image} />
            </div>
           
            <br/>
          <Card  className="main_info">
          <div>
            <h>{driver.fullName}</h>
            <br/>
            <p className="cmall">Rating: {rating}</p>
            <br/>
          </div>
          </Card>
          
          <div className="user-details1">
          <h2>Personal Information</h2>
            <ListGroup className="li-pro">
              <ListGroup.Item>Email: {driver.email}</ListGroup.Item>
              <ListGroup.Item>Mobile No: {driver.mobile}</ListGroup.Item>
              <ListGroup.Item>License: {driver.licnum}</ListGroup.Item>
              <ListGroup.Item>Reg_no: {driver.vehnum}</ListGroup.Item>
            </ListGroup>
            <h2>Vehicle Information</h2>
            <ListGroup className="li-pro">
              <ListGroup.Item>Make: {driver.make}</ListGroup.Item>
              <ListGroup.Item>Model: {driver.model}</ListGroup.Item>
              <ListGroup.Item>Year: {driver.year}</ListGroup.Item>
              <ListGroup.Item>Color: {driver.color}</ListGroup.Item>
            </ListGroup>
            {/* Add more user information here */}
            
            
            <div className="upload-img">
            <input type="file" accept="image/*" onChange={handleFileChange}></input>
            <Button className="up-button" onClick={handleUploadImage} >
            Upload Image
            </Button>
            </div>
            <br/>
            
            <div>
            <input type="file" accept="image/*" onChange={handleNIDChange}></input>
            <Button className="upnid-button" onClick={handleUploadNID} >
              Upload NID
            </Button>
            </div>
            <br/>
            <div className="nid-picture">
            <img className="nid" alt="NID" src={`http://localhost:4000/`+nidImage} />
            </div>
          </div>
          
        </div>
  
      </Col>
      <Col>
      <div className="Ride_History">
        <h2>Ride History</h2>
          <ul>
            {driverRides.map((ride) => (
              <div className="Ride_Frame">
                <li>{ride.pickup} to {ride.destination} on {ride.time} at {ride.fare} BDT 
                <br/>
                Date:  {formatDateString(ride.completionDate)}
                <br/>
                Rating: {ride.review}
                <br/>
                </li>
              </div>
            ))}
          </ul>
      </div>
      </Col>
      </Row>
    </Container>
  );
};

export default Profile_Driver;
