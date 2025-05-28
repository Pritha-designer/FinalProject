import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function AboutPage() {
  return (
    <section className="py-5 bg-light">
       {/* Company Banner */}
      <div className="mb-5 d-flex justify-content-center">
        <img
        width={1200}
          src="https://mpkcrackers.in/Views/Ui/image/banner1.jpg" 
          alt="Company Banner"
        
        />
      </div>

      {/* About Content */}
      <Container>
        <Row className="justify-content-center">
         
          <Col md={10}>
            <h2 className="mb-4 text-uppercase">About Us</h2>
            <hr></hr>
        
            <p>
              <strong>www.crackerszoneonline.com</strong> is one of the leading online websites for shopping fireworks in <strong>Tamil Nadu</strong>.
            </p>
            <p>
              We provide high-quality fireworks at the lowest rates. Our customers and festival lovers can trust our original branded fireworks for every celebration.
            </p>
            <p>
              All our products are made using <strong>high-quality chemicals</strong> approved by the <strong>Government of India</strong>. We strictly follow all government safety regulations in the production of our fireworks.
            </p>
            <p>
              Delivery is available <strong>throughout Tamil Nadu</strong> (with additional lorry freight and delivery charges).
            </p>
            <p>
              We also offer delivery to other states, specifically in the cities: <strong>Bangalore, Hyderabad, and Vijayawada</strong> (extra delivery charges apply).
            </p>
            <p>
              All payments can be made securely via <strong>Debit/Credit cards</strong> through our online platform.
            </p>
            <p>
              We assure you <strong>100% satisfaction</strong> and guaranteed quality for your <strong>Diwali</strong> and all other festive celebrations.
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default AboutPage;
