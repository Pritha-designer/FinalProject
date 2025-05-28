
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-3 mt-5">
      <Container>
        <Row>
          <Col md={4} className="mb-4">
            <h5>100% SECURE SHOPPING</h5>
            <p>
              <strong>Contact Address</strong><br />
             No.27 Dhara Puram Colony,<br />
              Sivakasi-626 189.<br />
              📞 9989234411, 9828098234<br />
              📧 <a href="mailto:info@crackerszoneonline.com" className="text-white">mailto:info@crackerszoneonline.com</a>
            </p>
          </Col>

          <Col md={4} className="mb-4">
            <h5>Information</h5>
            <ul className="list-unstyled">
              <li><a href="/about" className="text-white">About</a></li>
              <li><a href="/about" className="text-white">Our History</a></li>
              <li><a href="/about" className="text-white">Privacy Policy</a></li>
              <li><a href="/about" className="text-white">Terms and Conditions</a></li>
            </ul>
          </Col>

          <Col md={4} className="mb-4">
            <h5>Extras</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white">Wishlist</a></li>
              <li><a href="#" className="text-white">Order Tracking</a></li>
              <li><a href="#" className="text-white">Payment Receipt</a></li>
              <li><a href="#" className="text-white">Contact Us</a></li>
              <li><a href="#" className="text-white">Returns</a></li>
            </ul>
          </Col>
        </Row>

        <hr className="border-gray" />
        <p className="text-center small">© {new Date().getFullYear()} Crackers Zone Fireworks Online. All rights reserved.</p>
      </Container>
    </footer>
  );
}

export default Footer;
