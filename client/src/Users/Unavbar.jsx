// src/components/Navbar.js

import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom"

const Unavbar = () => {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem('user');
  const userName = storedUser ? JSON.parse(storedUser)?.name : null;

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userToken');
    navigate('/');
  };

  return (
    <Navbar bg="" variant="dark" expand="lg" style={{backgroundColor:"teal"}}>
      <Container>
        <Navbar.Brand ><Link to='/uhome' style={{color:'white',textDecoration:"none"}}>Darshan-Ease</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto" >
            <Link to="/uhome" style={{padding:"10px",color:"white",textDecoration:"none"}}>Home</Link>
            <Link to="/utemples" style={{padding:"10px",color:"white",textDecoration:"none"}}>Temples</Link>
            <Link to="/mybookings" style={{padding:"10px",color:"white",textDecoration:"none"}}>My Bookings</Link>
            <button
              type="button"
              onClick={handleLogout}
              style={{background: 'transparent', border: 'none', color: '#fff', paddingLeft:"10px", paddingTop:"10px", cursor: 'pointer'}}
            >
              Logout
            </button>
            {userName && (
              <span style={{color:"white",paddingTop:"5px",paddingLeft:"10px"}}>({userName})</span>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Unavbar;
