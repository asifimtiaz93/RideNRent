import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the JWT token from local storage
    localStorage.removeItem("token");

    // Redirect the user to the login page or perform any other desired actions
    navigate("/login");
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
