import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Nav, Card, Form } from "react-bootstrap";
import Chart from 'chart.js/auto';
import { Line, Bar } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/admin.css";
import Header_Admin from "./Header_adm";    
import { useNavigate } from "react-router-dom";
const Admin = () => {
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
  const [passCount, setPassCount] = useState(null);
  const [dvrCount, setDvrCount] = useState(null);
  const [rideCount, setRideCount] = useState(null);
  const [totalFare, setTotalFare] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [ridesPerDayData, setRidesPerDayData] = useState(null);
  const [farePerDayData, setFarePerDayData] = useState(null);

  useEffect(() => {
    // Fetch data when component mounts and whenever selectedMonth or selectedYear changes
    fetchData();
  }, [selectedMonth, selectedYear]);

  const fetchData = () => {
    axios
      .get(`http://localhost:4000/userCount`, {})
      .then((response) => {
        setPassCount(response.data.passengerCount);
        setDvrCount(response.data.driverCount);
        setRideCount(response.data.rideCount);
        setTotalFare(response.data.totalFare);
      })
      .catch((error) => {
        console.error("Error fetching user count:", error);
      });

    axios
      .get(`http://localhost:4000/ridesPerDay/${selectedMonth}/${selectedYear}`)
      .then((response) => {
        const data = response.data.ridesPerDay;
        setRidesPerDayData({
          labels: data.map((entry) => entry.day),
          datasets: [
            {
              label: "Rides per Day",
              data: data.map((entry) => entry.count),
              fill: false,
              borderColor: "rgba(75,192,192,1)",
              borderWidth: 2,
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Error fetching rides per day:", error);
      });

    axios
      .get(`http://localhost:4000/farePerDay/${selectedMonth}/${selectedYear}`)
      .then((response) => {
        const data = response.data.farePerDay;
        setFarePerDayData({
          labels: data.map((entry) => entry.day),
          datasets: [
            {
              label: "Fare per Day",
              data: data.map((entry) => entry.totalFare),
              backgroundColor: "rgba(255,99,132,0.2)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Error fetching fare per day:", error);
      });
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
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
          <Row>
            <Col>
              <Card className="mt-4 p-4" style={{ backgroundColor: '#126577' }}>
                <p className="bigBoldText text-center">Total Users</p>
                <p className="bigBoldText text-center">{passCount}</p>
              </Card>
            </Col>
            <Col>
              <Card className="mt-4 p-4" style={{ backgroundColor: '#065535'}}>
                <p className="bigBoldText text-center">Total Drivers</p>
                <p className="bigBoldText text-center"> {dvrCount}</p>
              </Card>
            </Col>
            <Col>
              <Card className="mt-4 p-4" style={{ backgroundColor: '#f44336'}}>
                <p className="bigBoldText text-center">Total Rides</p>
                <p className="bigBoldText text-center"> {rideCount}</p>
              </Card>
            </Col>
            <Col>
              <Card className="mt-4 p-4" style={{ backgroundColor: '#351c75'}}>
                <p className="bigBoldText text-center">Total Transaction</p>
                <p className="bigBoldText text-center"> {totalFare} Taka</p>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card className="mt-4 p-4">
                <Form>
                  <Form.Group controlId="monthSelect">
                    <Form.Label>Select Month:</Form.Label>
                    <Form.Control
                      as="select"
                      value={selectedMonth}
                      onChange={handleMonthChange}
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                        <option key={month} value={month}>
                          {new Date(2000, month - 1, 1).toLocaleString("en-US", {
                            month: "long",
                          })}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="yearSelect">
                    <Form.Label>Select Year:</Form.Label>
                    <Form.Control
                      as="select"
                      value={selectedYear}
                      onChange={handleYearChange}
                    >
                      {Array.from({ length: 10 }, (_, i) => i + new Date().getFullYear() - 5).map(
                        (year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        )
                      )}
                    </Form.Control>
                  </Form.Group>
                </Form>
              </Card>
            </Col>
            <Col>
              <Card className="mt-4">
                <div className="m-4">
                  {ridesPerDayData && (
                    <Line
                      data={ridesPerDayData}
                      options={{
                        scales: {
                          x: {
                            type: "linear",
                            position: "bottom",
                          },
                          y: {
                            type: "linear",
                            beginAtZero: true,
                          },
                        },
                      }}
                    />
                  )}
                </div>
              </Card>
            </Col>
            <Col>
              <Card className="mt-4">
                <div className="m-4">
                  {farePerDayData && (
                    <Bar
                      data={farePerDayData}
                      options={{
                        scales: {
                          x: {
                            type: "linear",
                            position: "bottom",
                          },
                          y: {
                            type: "linear",
                            beginAtZero: true,
                          },
                        },
                      }}
                    />
                  )}
                </div>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;
