import React, { useState } from 'react';
import { Container, Row, Col, Button, Carousel} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../App.css'; 
const products = [
  { id: 1, title: 'Rockets', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYgWu7G1-VGQe55WY0qu6FtKkTWTwq1sRwuGfMCz7L7I1IMvwAvudA0vGjPvfkq2IEcD0&usqp=CAU/50x50', price: '₹125' },
  { id: 2, title: 'Chakra', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE5OQAyzIAPp2RWPVarstnzu3xmFOcRr33uP7CUjO0Y3G2pmtR5qQXZYuUepMv79rR2xA&usqp=CAU/50x50', price: '₹130' },
  { id: 3, title: 'Flowerpot', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmHpb0P7QxVPI8G-N8FZpz95el3w0Jo0Ylrg&s/50x50', price: '₹145' }
];

export default function HomePage() {
   const navigate = useNavigate();
const [loaded, setLoaded] = useState({});

  const handleImageLoad = (id) => {
    setLoaded((prev) => ({ ...prev, [id]: true }));
  };
   return (<>
  <section className="bg-light">
      <Container>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://img.freepik.com/free-vector/festival-crackers-with-sparkles-happy-diwali_1017-21665.jpg?uid=R39290110&ga=GA1.1.1797876085.1741242178&semt=ais_hybrid&w=740"          
               alt="First slide"
            />
            <Carousel.Caption>
              <h3>Exclusive Diwali Sale</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://img.freepik.com/free-vector/happy-diwali-beautiful-bright-yellow-purple-banner_1017-20785.jpg?uid=R39290110&ga=GA1.1.1797876085.1741242178&w=740"
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3>New Arrival</h3>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>
    </section>
     <section className="bg-light py-5">
      <Container>
        <Row className="align-items-center">
          <Col md={6} >
            <h4 className="text-muted">EXCLUSIVE CRACKERS</h4>
            <h1 className="display-4">DIWALI DHAMAKA</h1>
            <p>HURRY LIMITED SALE</p>
            <Button variant="btn btn-outline-warning" onClick={() => navigate('/orders')}>Buy Now</Button>
          </Col>
          <Col md={6}>
            <img
              src="https://www.pngitem.com/pimgs/m/65-654725_crackers-images-for-diwali-png-diwali-crackers-gift.png" 
              alt="crackers"
              className="img-fluid"
            />
          </Col>
        </Row>
      </Container>
    </section>
     <section className="py-5">
      <Container className='pdtimg'>
        <h3 className="mb-4 text-uppercase">Featured Collection</h3>
        <Row>
          {products.map(product => (
            <Col md={4} key={product.id} className="mb-4">
        <img
              src={product.image}
              alt={product.name}
              className={`image-animated ${loaded[product.id] ? 'loaded' : ''}`}
              onLoad={() => handleImageLoad(product.id)

              }
                 onClick={() => navigate('/orders')}
            />
            
            </Col>
          ))}
        </Row>
      </Container>
    </section>
    </>
  
   );
 }
