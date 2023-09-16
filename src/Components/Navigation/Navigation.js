import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Navigation.css';
// import { NavLink } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa6';
import { BsSearch } from 'react-icons/bs';
import { useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { UserContext } from '../ContextProvider/UserContextProvider';
import { fetchCurrentLocation, fetchCurrentLocationImage } from '../../redux/Current-Location/CurrentLocation';
import { fetchCountries } from '../../redux/Countries/Countries';
import { fetchweather } from '../../redux/Weather-redux/Weatherforstore';

// import Logo from './planet.png';

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const goBack = () => {
    navigate(-1); // Go back to the previous page
  };
  const {
    selectedContinent,
    handleContinentChange,
    setweathercountry,
    // contryCode,
  } = useContext(UserContext);
  if (location.pathname === '/cities') {
    const storedData = localStorage.getItem('countrytodisplayinsecondpage');
    const parsedData = JSON.parse(storedData);
    dispatch(fetchCountries(parsedData.countrycode));
  }
  if (location.pathname === '/weather') {
    const storedData = localStorage.getItem('countrytoshowweather');
    const parsedData = JSON.parse(storedData);
    setweathercountry(parsedData.weatherlocation);
    dispatch(fetchweather(parsedData.countrycode));
  }

  useEffect(() => {
    dispatch(fetchCurrentLocation(selectedContinent));
    dispatch(fetchCurrentLocationImage(selectedContinent));
  }, [dispatch, selectedContinent]);

  return (
    <Navbar expand="lg" className="nav-color">
      <Container>
        {location.pathname !== '/' && (
        <div
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              goBack();
            }
          }}
          onClick={goBack}
        >
          <FaArrowLeft />
        </div>
        )}
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
        {/* <input placeholder="0064218464f0c370e0b3da8e5e197bf8" /> */}
        {location.pathname === '/' && (
          <>
            <select id="continentSelect" onChange={handleContinentChange}>
              <option value="">0064218464f0c370e0b3da8e5e197bf8</option>
              <option value="Africa">Africa</option>
              <option value="Antarctica">Antarctica</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="North-America">North-America</option>
              <option value="South-America">South-America</option>
              <option value="Oceania">Australia</option>
            </select>
            <span className="search-icon-conatiner">
              <BsSearch className="search-icon" />
            </span>
          </>
        )}
      </Container>
    </Navbar>
  );
}

export default Navigation;
