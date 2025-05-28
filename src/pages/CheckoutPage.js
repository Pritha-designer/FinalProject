import React from 'react';
import { Button, Form, Container, Card, Row, Col } from 'react-bootstrap';
import { placeOrder } from '../api/orderApi';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
  const navigate = useNavigate();


const cart = JSON.parse(localStorage.getItem('cart')) || [];
const subtotal = cart.reduce((acc, item) => acc + item.quantity * item.price, 0);

  const handleCheckout = async (e) => {
    e.preventDefault();
 const name = e.target.name.value;
  const phone = e.target.phone.value;
  const address = e.target.address.value;
    if (!cart || cart.length === 0) {
      alert('Your cart is empty.');
      return;
    }

    const orderData = {
      customerName: name,
    phone,
    address,
      items: cart,
      total: subtotal,
    };

    try {
      await placeOrder(orderData);
      alert('Order placed successfully!');
       localStorage.removeItem('cart');
      navigate('/'); // or navigate('/order-success')
    }
     catch (err) {
      console.error('Checkout error:', err);
      alert('Failed to place order. Try again.');
    }
  };


  return (
    <Container className="mt-4">
      <h3 className="text-center text-success mb-4">Checkout</h3>
      <Card className="p-4 shadow-sm">
        <Form onSubmit={handleCheckout}>
          {/* Example billing form fields (optional) */}
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="name">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" required placeholder="Enter your name" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="phone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="tel" required placeholder="Enter your phone" />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Shipping Address</Form.Label>
            <Form.Control as="textarea" rows={3} required placeholder="Enter full address" />
          </Form.Group>

          <h5 className="mb-3">Total: ₹{subtotal}</h5>

          <Button type="submit" variant="success" className="w-100">
            Confirm & Place Order
          </Button>
        </Form>
      </Card>
    </Container>
  );
}
