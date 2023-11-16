import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import Message from './Message';
import axios from 'axios';

import '../styles/chatWindow.css';
import Header2 from './header2';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Footer from "../components/Footer";


const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const passengerId = localStorage.getItem('passengerid');
  const rideId = localStorage.getItem('rideid');
  const token = localStorage.getItem('token');
  const [textm, settext] = useState('');
  const driverId = localStorage.getItem('driverid');
  const [dvr, setDvr]  =useState([]);
  useEffect(() => {
    axios
      .post(`http://localhost:4000/chatWindow/${rideId}`, null, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        const convId = response.data.conversationId;
        setConversationId(convId);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  useEffect(() => {
    axios
      .get(`http://localhost:4000/messages/${conversationId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        const msg = response.data;
        setMessages(msg);
      })
      .catch((error) => {
        console.log(error);
      });

  });

  useEffect(() => {
    axios
      .get(`http://localhost:4000/profileDvr/${driverId}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setDvr(response.data.dvr)
        console.log(dvr);
      })
      .catch((error) => {
        console.log(error);
      });

  });

  const handleSend = (e) => {
    e.preventDefault();
    const data = {
      conversationId,
      passengerId,
      textm,
    };

    axios
      .post(`http://localhost:4000/messages/${conversationId}`, data, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        settext('');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="messenger">
      <Header2 />

      <Container>
        <Row>
          <Col xs={4} >
            <Card className="driver-details">


          Driver: {dvr.fullName}
          <br/>
          Mobile: {dvr.mobile}
          </Card >
          </Col>

          <Col className="chat-box">
            <div className="chat-box-wrapper">
              {messages.map((m) => (
                <Message key={m._id} message={m} own={m.sender === passengerId} />
              ))}
            </div>

            <Form onSubmit={handleSend} className="chat-box-bottom">
              <Form.Control
                value={textm}
                onChange={(e) => settext(e.target.value)}
                className="chat-input"
                type="text"
                placeholder="Type a message..."
              />
              <Button type="submit" className="chat-send-button">
              <i className="bi bi-arrow-right-circle"></i>
              </Button>
            </Form>
          </Col>
        </Row>
        <Footer/>
      </Container>
    </div>
  );
};

export default ChatWindow;
