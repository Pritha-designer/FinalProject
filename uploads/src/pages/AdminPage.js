import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function AdminPage() {
  const navigate = useNavigate();

  return (
    
    <Container className="mt-5">
      <h2 className="text-center text-primary mb-4">Cracker Stock Management System</h2>
      <Row className="g-4">
        {/* Admin - Add Cracker Stock  */}
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body className="d-flex flex-column justify-content-between">
              <Card.Title>Admin - Add Cracker Stock</Card.Title>
              <Card.Text>Enter details of crackers to maintain stock.</Card.Text>
              <Button variant="primary" onClick={() => navigate('/add-cracker')}>Go</Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Admin - View Cracker List */}
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body className="d-flex flex-column justify-content-between">
              <Card.Title>Admin - View Cracker List</Card.Title>
              <Card.Text>See all crackers available in the shop.</Card.Text>
              <Button variant="warning" onClick={() => navigate('/cracker-list')}>Go</Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Customer - Place Order 
        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body className="d-flex flex-column justify-content-between">
              <Card.Title>Customer - Place Order</Card.Title>
              <Card.Text>Customers can sign up, login and place cracker orders.</Card.Text>
              <Button variant="success" onClick={() => navigate('/login')}>Go</Button>
            </Card.Body>
          </Card>
        </Col>*/}

        {/* Admin - View Orders */}
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body className="d-flex flex-column justify-content-between">
              <Card.Title>Admin - View Orders</Card.Title>
              <Card.Text>See all orders placed by customers.</Card.Text>
              <Button variant="primary" onClick={() => navigate('/admin-orders')}>Go</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
 
  );
}
