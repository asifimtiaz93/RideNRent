import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../styles/Footer.css"; // Import your CSS file for the footer styling

const Footer = () => {
  return (
    <footer className="footer" style={{ backgroundColor: "#75bf7a" , marginTop: "2cm" }}>
      <Container>
        <Row>
          <Col lg={4} md={6}>
            <div className="footer-section">
              <h4>About Us</h4>
              <p>
              Empowering seamless transportation experiences, one ride at a time.
              </p>
            </div>
          </Col>
          <Col lg={4} md={6}>
            <div className="footer-section">
              <h4>Contact Us</h4>
              <p>
                MIST <br />
                Mirpur Cantonment <br />
                Email: G6@mist.com <br />
                Phone: 01769-111111
              </p>
            </div>
          </Col>
          <Col lg={4} md={12}>
            <div className="footer-section">
              <h4>Follow Us</h4>
              <ul className="social-icons">
                <li>
                  <a href="#">
                    <i className="fab fa-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fab fa-linkedin"></i>
                  </a>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Group 06. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
