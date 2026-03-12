import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Onavbar = () => {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem('user');
  const userName = storedUser ? JSON.parse(storedUser)?.name : 'Guest';

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('organizerToken');
    navigate('/');
  };

  return (
    <Navbar bg="" variant="dark" expand="lg" style={{ backgroundColor: 'teal' }}>
      <Container>
        <Navbar.Brand>
          <Link to="/organizer/home" style={{ color: 'white', textDecoration: 'none' }}>
            DarshanEase (Organizer)
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Link to="/organizer/home" style={{ padding: '10px', color: 'white', textDecoration: 'none' }}>
              Dashboard
            </Link>
            <Link to="/organizer/mytemple" style={{ padding: '10px', color: 'white', textDecoration: 'none' }}>
              My Temple
            </Link>
            <Link to="/organizer/darshans" style={{ padding: '10px', color: 'white', textDecoration: 'none' }}>
              Darshans
            </Link>
            <Link to="/organizer/bookings" style={{ padding: '10px', color: 'white', textDecoration: 'none' }}>
              Bookings
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#fff',
                paddingLeft: '10px',
                paddingTop: '10px',
                cursor: 'pointer',
              }}
            >
              Logout
            </button>
            <span style={{ color: 'white', paddingTop: '0px' }}>({userName})</span>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Onavbar;
