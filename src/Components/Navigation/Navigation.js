import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Navigation.css';
// import { NavLink } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
// import Logo from './planet.png';

function Navigation() {
  // const activeLink = ({ isActive }) => ({
  //   color: isActive ? '#0d6efd' : '',
  //   paddingBottom: isActive ? '0.25rem' : '',
  //   borderBottom: isActive ? '3px solid #0d6efd' : '',
  // });

  return (
    <Navbar expand="lg" className="nav-color">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <input placeholder="0064218464f0c370e0b3da8e5e197bf8" />
        <span className="search-icon-conatiner">
          <BsSearch className="search-icon" />
        </span>
      </Container>
    </Navbar>
  );
}

export default Navigation;
