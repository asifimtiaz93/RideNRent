import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import LogoutButton from "./logoutButton";
//import "../styles/profile.css"; // Import your CSS for the profile page styling

const Profile = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);


  const openlogin = () => {
    navigate("/login");
  }
  const opensignup = () => {
    navigate("/signup");
  }
  const openconstruction = () => {
    navigate("/construction");
  }
  const openlanding = () => {
    navigate("/");
  }
  const handleFileChange = (event) => {
    // Handle the file selection
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");

    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append("image", file); // Use the same field name as expected by your server

    axios
      .post("http://localhost:4000/uploadimg", formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
        },
      })
      .then((res) => {
        // Handle success, e.g., show a success message or update the UI
        console.log("Image uploaded successfully");
      })
      .catch((err) => {
        // Handle errors, e.g., display an error message
        console.error("Error uploading image: ", err);
      });
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.get("http://localhost:4000/profile", {
        headers: {
            Authorization: token
        }
    })
    .then((res) => console.log(res))
    .catch((err) => {
        navigate("/login");
    })
  },[])
//   const [user, setUser] = useState({
//     fullName: "",
//     email: "",
//     mobile: "",
//     // Add more user information fields as needed
//   });

//   useEffect(() => {
//     // Fetch user data from your backend after authentication
//     axios
//       .get("http://localhost:4000/user_profile", {
//         // You might need to include authentication headers here
//       })
//       .then((response) => {
//         const userData = response.data;
//         setUser(userData);
//       })
//       .catch((error) => {
//         console.error("Error fetching user data: ", error);
//         // Handle error and maybe redirect to login if user data cannot be fetched
//         navigate("/login");
//       });
 // }, []);

  return (
   <div>
    <nav>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/profile">Profile</Link></li>
      <li><LogoutButton /></li> {/* Include the LogoutButton component */}
      
    </ul>
  </nav>
  <form onSubmit={handleSubmit}>
    <input type="file" accept="image/*" onChange={handleFileChange}></input>
    <button type="submit">Submit</button>
  </form>
  </div>

  );
};

export default Profile;
