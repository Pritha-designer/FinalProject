import React, { useEffect, useState } from 'react';
import { fetchCrackers } from '../api/crackerApi';
import { Container, Card, Button, Form, Row, Col, Pagination } from 'react-bootstrap';
import './OrderPage.css';

import { useNavigate } from 'react-router-dom';

export default function OrderPage() {
  const [crackers, setCrackers] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
 const navigate = useNavigate();
  const itemsPerPage = 6;

  useEffect(() => {
 const token = localStorage.getItem('token');
   if (!token) {
     navigate('/login');
   }
 }, [navigate]);
// useEffect(() => {
//   navigate('/login');
// }, );

  useEffect(() => {
    const loadCrackers = async () => {
      const res = await fetchCrackers();
      setCrackers(res.data);
    };
    loadCrackers();
  }, []);

  const handleQuantityChange = (id, value) => {
    setQuantities({ ...quantities, [id]: parseInt(value) || 0 });
  };

  const handleAddToCart = (cracker) => {
  const qty = quantities[cracker._id] || 0;
  if (qty === 0) {
    alert('Please select quantity before adding to cart.');
    return;
  }

  const item = {
    crackerId: cracker._id,
    name: cracker.name,
    quantity: qty,
    price: cracker.price,
    image: cracker.image,
  };

  const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
  const index = existingCart.findIndex((i) => i.crackerId === item.crackerId);
  
  if (index > -1) {
    existingCart[index].quantity += item.quantity;
  } else {
    existingCart.push(item);
  }

  localStorage.setItem('cart', JSON.stringify(existingCart));
  alert(`${item.name} added to cart!`);
};

 
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = crackers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(crackers.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container className="mt-4">
      <h3 className="mb-4 text-center text-success">Place Your Order</h3>
      <Row xs={1} md={2} lg={3} className="g-4">
        {currentItems.map((cracker) => (
          <Col key={cracker._id}>
            <Card className="h-100 shadow-sm order-card">
              {cracker.image && (
                <Card.Img 
                  variant="top"
                  src={`http://localhost:5000/uploads/${cracker.image}`}
                  alt={cracker.name}
                  style={{ height: '200px', objectFit: 'contain' }}
                />
              )}
              <Card.Body>
                <Card.Title className="order-title">{cracker.name}</Card.Title>
                <Card.Subtitle className="mb-2 order-subtitle">
                  {cracker.type}
                </Card.Subtitle>
                <Card.Text >
                    <span className="order-price">Price: ₹{cracker.price}</span> <br />
      Available: {cracker.quantity}
                </Card.Text>
               
               <Form.Group controlId={`qty-${cracker._id}`}>
  <Form.Label>Quantity</Form.Label>
  <div className="d-flex align-items-center">
    <Button
      variant="outline-secondary"
      onClick={() =>
        handleQuantityChange(
          cracker._id,
          Math.max((quantities[cracker._id] || 0) - 1, 0)
        )
      }
    >
      -
    </Button>
    <Form.Control
      type="text"
      readOnly
      className="mx-2 text-center"
      style={{ width: '60px' }}
      value={quantities[cracker._id] ?? 0}
    />
    <Button
      variant="outline-secondary"
      onClick={() =>
        handleQuantityChange(
          cracker._id,
          Math.min((quantities[cracker._id] || 0) + 1, cracker.quantity)
        )
      }
    >
      +
    </Button>
  </div><br/>
</Form.Group>
 <Button
    variant="warning"
    className="order-button "
    onClick={() => handleAddToCart(cracker)}
  >
    Add to Cart
  </Button>
              </Card.Body>
            </Card>
          </Col>
     
        ))}
       


      </Row><br/>

      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            <Pagination.First
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            />
            <Pagination.Prev
              onClick={() =>
                currentPage > 1 && setCurrentPage(currentPage - 1)
              }
              disabled={currentPage === 1}
            />
            {[...Array(totalPages)].map((_, idx) => (
              <Pagination.Item
                key={idx + 1}
                active={currentPage === idx + 1}
                onClick={() => paginate(idx + 1)}
              >
                {idx + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() =>
                currentPage < totalPages && setCurrentPage(currentPage + 1)
              }
              disabled={currentPage === totalPages}
            />
            <Pagination.Last
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>
      )}
    </Container>
  );
}
