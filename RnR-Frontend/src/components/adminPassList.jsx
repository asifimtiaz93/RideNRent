import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Nav, Table, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Header_Admin from "./Header_adm";
import { useNavigate } from "react-router-dom";
function AdminPassList() {
  const [passengers, setPassengers] = useState([]);
    
  const navigate = useNavigate();
  const handleDashboardClick = () => {
    navigate("/admin");
  };

  const handleUsersClick = () => {
    navigate("/adminPass");
  };

  const handleRidesClick = () => {
    navigate("/adminDvr");
  };
  useEffect(() => {
    // Fetch the passenger list when the component mounts
    fetchPassengerList();
  }, []);

  const fetchPassengerList = () => {
    axios
      .get('http://localhost:4000/passengers') // Update the endpoint URL
      .then((response) => {
        setPassengers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching passenger list:', error);
      });
  };

  const handleDeletePassenger = (passengerId) => {
    // Make a request to delete the passenger by ID
    axios
      .delete(`http://localhost:4000/passengers/${passengerId}`)
      .then(() => {
        // Remove the deleted passenger from the state
        setPassengers((prevPassengers) =>
          prevPassengers.filter((passenger) => passenger._id !== passengerId)
        );
      })
      .catch((error) => {
        console.error('Error deleting passenger:', error);
      });
  };

  return (
    <Container fluid>
      <Row>
        <Header_Admin />
      </Row>
      <Row>
      <Col md={2} className="sidebar">
      <Nav className="flex-column">
        <Nav.Link onClick={handleDashboardClick}>Dashboard</Nav.Link>
        <Nav.Link onClick={handleUsersClick}>Users</Nav.Link>
        <Nav.Link onClick={handleRidesClick}>Riders</Nav.Link>
      </Nav>
    </Col>
        <Col md={10} className="main-content">
          <h2>Passenger List</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {passengers.map((passenger, index) => (
                <tr key={passenger._id}>
                  <td>{index + 1}</td>
                  <td>{passenger.fullName}</td>
                  <td>{passenger.email}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDeletePassenger(passenger._id)}
                      className="db-button"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminPassList;
