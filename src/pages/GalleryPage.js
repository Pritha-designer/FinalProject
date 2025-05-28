import React, { useState } from 'react';
import { Container, Row, Col, Card,Pagination  } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './GalleryPage.css';
const products = [
  {
    id: 1,
    name: "Flower Pot Big",
    image: "https://www.yaakkaicrackers.com/wp-content/uploads/2023/09/fpbig.png",
    price: "₹250",
    type: "Colorful sparks with long duration."
  },
  {
    id: 2,
    name: "Rocket Shots",
    image: "https://5.imimg.com/data5/IOS/Default/2024/8/440321421/JD/BV/SC/141963085/product-jpeg.png",
    price: "₹150",
    type: "Sky-high rockets with loud bangs."
  },
  {
    id: 3,
    name: "Sparklers 12 inch",
    image: "https://5.imimg.com/data5/SELLER/Default/2024/9/451832867/UI/UB/LO/36275315/7-cm-green-sparkler-500x500.jpeg",
    price: "₹50",
   type: "Safe and bright sparklers for all ages."
  },
  {
    id: 4,
    name: "Chakkars",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSBBN5QG5fjtFtHbsYOSxt_oyV48qGPL57vb05Sz6hGI-UiRtltXSoejlXb2FRCrlTmnU&usqp=CAU",
    price: "₹120",
    type: "Spinning fire rings for the ground."
  },
  {
    id: 5,
    name: "Bombs Deluxe",
    image: "https://5.imimg.com/data5/SELLER/Default/2023/1/CL/LO/MN/30090017/img-20230113-wa0072.jpg",
    price: "₹300",
    type: "High-decibel crackers for thrill seekers."
  },
  {
    id: 6,
    name: "Color Matches",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSm54a_fbe2PqmYRxrnp_cDlRSEBvbbWgZxtF3VI5QM6nSd72V65LoGCDQQXw0JSEA9uA&usqp=CAU",
    price: "₹30",
   type: "Mini colorful bursts."
  },
  { id: 7, name: "Bullet Bomb", image: "https://www.kaliswari-fireworks.com/img/products/atombom/1.jpg", price: "₹200", description: "Powerful blast." },
  { id: 8, name: "Sparkle Fountain", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZILL-Bdh-6T-VjVHK94B7U2bqrIJH0evWVnjKaXyO8k4Lsd7oSfwayg7nI2mTjItIEzQ&usqp=CAU", price: "₹180", description: "Colorful fountain." },
  { id: 9, name: "Diwali Combo", image: "https://amazingcrackers.in/wp-content/uploads/2022/09/maxresdefault.jpg", price: "₹999", description: "Family pack." },
  
];

const itemsPerPage = 6;
function GalleryPage() {

const [currentPage, setCurrentPage] = useState(1);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = products.slice(indexOfFirst, indexOfLast);
const navigate = useNavigate();
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="py-5 bg-light">
      <Container>
        <h2 className="text-center mb-5 text-uppercase">Product Gallery</h2>
        <Row>
  {currentItems.map((product) => (
    <Col md={4} sm={6} xs={12} key={product.id} className="mb-4">
      <Card className="h-100">
        <Card.Img variant="top" src={product.image} width={100} height={200}  
        className="image-card"
  onClick={() => navigate('/orders')}/>
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <h5>{product.price}</h5>
          
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>
         {/* Pagination Buttons */}
        <Pagination className="justify-content-center mt-4">
          {[...Array(totalPages).keys()].map((num) => (
            <Pagination.Item
              key={num + 1}
              active={num + 1 === currentPage}
              onClick={() => handlePageChange(num + 1)}
            >
              {num + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </Container>
    </section>
  );
}

export default GalleryPage;
