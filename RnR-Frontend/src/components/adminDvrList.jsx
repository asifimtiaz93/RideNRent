import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Nav, Table, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Header_Admin from "./Header_adm";
import { useNavigate } from "react-router-dom";
function AdminDriverList() {
  const [drivers, setDrivers] = useState([]);

     
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
    // Fetch the driver list when the component mounts
    fetchDriverList();
  }, []);

  const fetchDriverList = () => {
    axios
      .get('http://localhost:4000/Drivers') // Update the endpoint URL for drivers
      .then((response) => {
        setDrivers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching driver list:', error);
      });
  };

  const handleDeleteDriver = (driverId) => {
    // Make a request to delete the driver by ID
    axios
      .delete(`http://localhost:4000/Drivers/${driverId}`)
      .then(() => {
        // Remove the deleted driver from the state
        setDrivers((prevDrivers) =>
          prevDrivers.filter((driver) => driver._id !== driverId)
        );
      })
      .catch((error) => {
        console.error('Error deleting driver:', error);
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
          <h2>Driver List</h2>
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
              {drivers.map((driver, index) => (
                <tr key={driver._id}>
                  <td>{index + 1}</td>
                  <td>{driver.fullName}</td>
                  <td>{driver.email}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteDriver(driver._id)}
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

export default AdminDriverList;
