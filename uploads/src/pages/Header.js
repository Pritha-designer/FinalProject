import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Form, Button ,NavDropdown} from 'react-bootstrap';
import logo1 from './logo1.png';
function Header() {
    const navigate = useNavigate();

   const [token, setToken] = useState(localStorage.getItem('token'));
  const [name, setName] = useState(localStorage.getItem('name') || '');
 
useEffect(() => {
  const interval = setInterval(() => {
    setToken(localStorage.getItem('token'));
    setName(localStorage.getItem('name') || '');
  }, 1000); 

  return () => clearInterval(interval); 
 }, []);
// useEffect(() => {
//   setToken(localStorage.getItem('token'));
//   setName(localStorage.getItem('name') || '');
  
// }, []);

   const handleLogout = () => {
    localStorage.clear();
          setToken(null);
    setName('');
    navigate('/login');
  };
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="sticky-top shadow">
      <Container>
        <Navbar.Brand href="#"><img src={logo1} alt="Logo" height={40} width={120}></img></Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
             <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/orders">Shop</Nav.Link>
            <Nav.Link href="/gallery">Gallery</Nav.Link>
          </Nav>
    <Nav className="ms-auto">
            {token ? (
              <NavDropdown title={`Hello, ${name}`} id="user-nav-dropdown">
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
              {/* <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/signup">Sign Up</Nav.Link>  */}
                <Button variant="dark" onClick={() => navigate('/signup')}>Signup</Button> 
            <Button variant="outline-light" className="me-2" onClick={() => navigate('/login')}>Login</Button> 
              </>
            )}
          </Nav>
          <Form className="d-flex">
            
            <Button variant="warning" onClick={() => navigate('/cart')}>🛒Cart ({JSON.parse(localStorage.getItem('cart') || '[]').length})</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Header;