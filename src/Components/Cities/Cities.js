import './Cities.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useEffect, useState, useContext } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
// import AfricaImage from '../images/Africa_unnamed_colour.jpg';
// import OceaniaImage from '../images/Oceania_unnamed_colour.jpg';
// import AntarcticaImage from '../images/Antarctica_unnamed_colour.jpg';
// import AsiaImage from '../images/Asia_unnamed_colour.jpg';
// import EuropeImage from '../images/Europe_unnamed_colour.jpg';
// import NorthAmericaImage from '../images/NAmerica_unnamed_colour.jpg';
// import SouthAmericaImage from '../images/SAmerica_unnamed_colour.jpg';
import Bigscreencomp from './Bigscreencomp';
import Smallscreencomp from './Smallscreencomp';
import { UserContext } from '../ContextProvider/UserContextProvider';
import { filterCities } from '../../redux/Countries/Countries';

const Cities = () => {
  // const currentLocationState = useSelector((state) => state.CurrentLocation);
  // eslint-disable-next-line prefer-destructuring
  // const continent = currentLocationState.continent; // Access 'continent' from the first element
  // const countries = useSelector((state) => state.CurrentLocation.countries);
  // const Image = currentLocationState.image;
  // const { dummyArray } = useContext(UserContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const {
    cityInput,
    setcityInput,
    // selectedContinent,
    countrytodisplayinsecondpage,
  } = useContext(UserContext);
  const dispatch = useDispatch();

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    // dispatch(fetchCurrentLocationCountries(selectedContinent));
    // dispatch(filterCountries({ cityInput }));

    window.addEventListener('resize', handleResize);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);

  // Now you can use 'continent' without causing errors
  const handleInputChange = (event) => {
    const keyword = event.target.value;
    setcityInput(keyword);
    dispatch(filterCities({ keyword }));
  };

  return (
    <>
      <div id="selected">
        <div>
          {/* <img className="" src={} alt="Location Map" /> */}
        </div>
        <div>
          <span>{countrytodisplayinsecondpage}</span>
        </div>
      </div>
      <Container className="contaner">
        <Row id="menu-header">
          <Col id="page-divider">
            <span>Menu header</span>
            <input
              placeholder="Enter country code"
              value={cityInput}
              onChange={handleInputChange}
            />
            <span className="search-icon-container">
              {/* Use onClick without parentheses to pass a function */}
              <BsSearch className="search-icon" />
            </span>
          </Col>
        </Row>
        {windowWidth < 768 ? (
          <Smallscreencomp />
        ) : (
          <Bigscreencomp />
        )}
      </Container>
    </>
  );
};

export default Cities;
