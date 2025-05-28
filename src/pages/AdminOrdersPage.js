import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Spinner, Alert } from 'react-bootstrap';

export default function AdminOrdersPage()
{
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/orders');
        setOrders(res.data.orders || []);
      } catch (err) {
        setError('Failed to fetch orders');
        console.error(err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <Container className="mt-4">
      <h3 className="mb-4 text-center text-warning">All Customer Orders</h3>

      {loading ? (
        <div className="text-center"><Spinner animation="border" /></div>
        ) : error ? (
        <Alert variant="danger">{error}</Alert>
        ) : orders.length === 0 ? (
        <p className="text-muted text-center">No orders placed yet.</p>
        ) : (
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>No</th>
             <th>Name</th>
              <th>Phone</th>
              <th>Address</th> 
              <th>Items</th>
              <th>Total Qty</th>
              <th>Total Price ₹</th>
              <th>Date</th>
            </tr>
          </thead>
    
          <tbody>
            {orders.map((order, index) => {
            const items = order.items || [];
              const totalQty = order.items.reduce((sum, item) => sum + item.quantity, 0);
               //const totalPrice = order.items.reduce((sum, item) => sum + item.quantity * item.price, 0);

const totalPrice = order.items.reduce((sum, item) => {
  const price = Number(item.price) || 0;
  return sum + item.quantity * price;
}, 0);
              return (
                <tr key={order._id || index}>
                  <td>{index + 1}</td>
                   <td>{order.customerName}</td>
      <td>{order.phone}</td>
      <td>{order.address}</td> 
          <td>
                    <ul className="mb-0">
                     {items.map((item, i) => (
            <li key={i}>
              {item.name} × {item.quantity} @ ₹{item.price}
            </li>
           ))}
           </ul>
          </td>
                  <td>{totalQty}</td>
                  <td>₹{totalPrice}</td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
     
    </Container>
  );
} 

