import React, { useState, useEffect } from "react";
import "../styles/Notification.css";
import Header_In from "./Header_In";
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NotificationPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:4000/conversation", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setSearchResults(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Driver data: ", error);
        navigate("/login");
      });
  }, [navigate]);

  // Function to navigate to the chat window when a card is clicked
  const handleCardClick = (result) => {
    const token = localStorage.getItem("token");
    axios.get(`http://localhost:4000/chatWindowDriver/${result._id}`, {
      headers: {
        Authorization: token,
      }
    })
    .then((response) => {
      // Navigate to the ChatWindow page with the selected conversation data
      navigate("/chatWindowDriver", { state: response.data });
    })
    .catch((error) => {
      console.error("Error fetching conversation data: ", error);
      // Handle the error as needed
    });
  };

  return (
    <Container>
      <Header_In />
      <h1 className="mb-4">Chats</h1>
      <Row>
        <Col md={8}>
          {searchResults.map((result) => (
            <Card 
              key={result._id}
              className="mb-3"
              onClick={() => handleCardClick(result)}
            >
              <Card.Body>
                <Card.Title>
                  <Badge bg="#75bf7a">New</Badge>
                  New message from @{result.members[0]?.fullName}
                </Card.Title>
                <Card.Text>{result.time}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default NotificationPage;
