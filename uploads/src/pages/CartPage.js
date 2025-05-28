import React, { useEffect, useState } from 'react';
import { Container, Card, Button,  Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {

  const [cartItems, setCartItems] = useState([]);
  const [cart] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(items);
  }, []);

  const handleRemove = (id) => {
    const updated = cartItems.filter(item => item._id !== id);
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Container className="mt-4">
      <h3 className="text-center text-primary mb-4">Your Cart</h3>
      {cartItems.length === 0 ? (
        <Card className="p-4 text-center">
          <h5>Your cart is empty.</h5>

          <Button variant="primary" onClick={() => navigate('/orders')}>
            Continue Shopping
          </Button>
        </Card>
      ) : (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Cracker</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map(item => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>₹{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>₹{item.price * item.quantity}</td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => handleRemove(item._id)}>
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Card className="p-3">
            <h5 className="text-end">Subtotal: ₹{subtotal}</h5>
            <div className="d-flex justify-content-between mt-3">
              <Button variant="secondary" onClick={() => navigate('/orders')}>
                Continue Shopping
              </Button>
            <Button
  variant="success"
  onClick={() =>
    navigate('/checkout', {
      state: {
         cartItems: cart,
         totalAmount: subtotal, // Pass the actual subtotal here
      },
    })
  }
>
                Proceed to Checkout
              </Button>
            </div>
          </Card>
        </>
      )}
    </Container>
  );
}
