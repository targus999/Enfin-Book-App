import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <Navbar bg="dark" expand="lg">
      <Navbar.Brand className='p-2 text-light' as={Link} to="/list">BookStore</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link className='text-light' as={Link} to="/list">List</Nav.Link>
          <Nav.Link className=' text-light' as={Link} to="/add">Add</Nav.Link>
        </Nav>
       
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
