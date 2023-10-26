import React from 'react';
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


   function Header({cartCounter}) {
   return (
    <Navbar expand="lg" sticky="top" className="bg-light nav">
      <Container className='navs'>
        <Navbar.Brand href="#home">My Store</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">
              <Link to='/' className='Home'>Home</Link>
              </Nav.Link>
              <Nav.Link href="#admin">
              <Link to='/admin' className='admin'>Admin</Link>
              </Nav.Link>
            <Nav.Link href="#products">
              products

              </Nav.Link>
            <NavDropdown title="Services" id="basic-nav-dropdown">
              <NavDropdown.Item href="#service1">Service 1</NavDropdown.Item>
              <NavDropdown.Item href="#service2">Service 2</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#contact">Contact</NavDropdown.Item>
            </NavDropdown>
          </Nav>
       <a class="btn btn-primary" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
cart ({cartCounter})
</a>
       
        </Navbar.Collapse>
      </Container>
    </Navbar>
      );
}

export default Header;
