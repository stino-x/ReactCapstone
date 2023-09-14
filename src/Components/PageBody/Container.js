/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState, useContext } from 'react';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BsSearch } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import AfricaImage from '../images/Africa_unnamed_colour.jpg';
import OceaniaImage from '../images/Oceania_unnamed_colour.jpg';
import AntarcticaImage from '../images/Antarctica_unnamed_colour.jpg';
import AsiaImage from '../images/Asia_unnamed_colour.jpg';
import EuropeImage from '../images/Europe_unnamed_colour.jpg';
import NorthAmericaImage from '../images/NAmerica_unnamed_colour.jpg';
import SouthAmericaImage from '../images/SAmerica_unnamed_colour.jpg';
import Bigscreen from './Bigscreen';
import Smallerscreen from './Smallerscreen';
import { UserContext } from '../ContextProvider/UserContextProvider';
import { fetchCurrentLocationCountries, filterCountries } from '../../redux/Current-Location/CurrentLocation';
// Import images for other continents similarly

// let saveReservedAPI = false;

const RocketContainer = () => {
  const currentLocationState = useSelector((state) => state.CurrentLocation);
  // eslint-disable-next-line prefer-destructuring
  const continent = currentLocationState.continent; // Access 'continent' from the first element
  // const countries = useSelector((state) => state.CurrentLocation.countries);
  // const Image = currentLocationState.image;
  // const { dummyArray } = useContext(UserContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const {
    inputCountry,
    setCountryValue,
    selectedContinent,
  } = useContext(UserContext);
  const dispatch = useDispatch();

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    dispatch(fetchCurrentLocationCountries(selectedContinent));
    // dispatch(filterCountries({ inputCountry }));

    window.addEventListener('resize', handleResize);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch, selectedContinent]);

  const displayImage = (selectedContinent, defaultContinent) => {
    let imageToReturn = null; // Default to null

    if (selectedContinent) {
      // Generate the image import key based on selectedContinent
      const imageKey = selectedContinent.replace(/-/g, '');

      // Use the imported image based on the key
      switch (imageKey) {
        case 'Africa':
          imageToReturn = AfricaImage;
          break;
        case 'Antarctica':
          imageToReturn = AntarcticaImage;
          break;
        case 'Asia':
          imageToReturn = AsiaImage;
          break;
        case 'Europe':
          imageToReturn = EuropeImage;
          break;
        case 'NorthAmerica':
          imageToReturn = NorthAmericaImage;
          break;
        case 'Oceania':
          imageToReturn = OceaniaImage;
          break;
        case 'SouthAmerica':
          imageToReturn = SouthAmericaImage;
          break;
        default:
          break;
      }
    } else if (defaultContinent) {
      // Generate the image import key based on defaultContinent
      const imageKey = defaultContinent.replace(/-/g, '');

      // Use the imported image based on the key
      switch (imageKey) {
        case 'Africa':
          imageToReturn = AfricaImage;
          break;
        case 'Antarctica':
          imageToReturn = AntarcticaImage;
          break;
        case 'Asia':
          imageToReturn = AsiaImage;
          break;
        case 'Europe':
          imageToReturn = EuropeImage;
          break;
        case 'NorthAmerica':
          imageToReturn = NorthAmericaImage;
          break;
        case 'Oceania':
          imageToReturn = OceaniaImage;
          break;
        case 'SouthAmerica':
          imageToReturn = SouthAmericaImage;
          break;
        default:
          break;
      }
    }

    return imageToReturn;
  };

  // Now you can use 'continent' without causing errors
  const handleInputChange = (event) => {
    const keyword = event.target.value;
    setCountryValue(keyword);
    dispatch(filterCountries({ keyword }));
  };

  return (
    <>
      <div id="selected">
        <div>
          <img className="" src={displayImage(selectedContinent, continent)} alt="Location Map" />
        </div>
        <div>
          <div>{ selectedContinent ? '' : 'You are currently in:'}</div>
          <span>{continent}</span>
        </div>
      </div>
      <Container className="contaner">
        <Row id="menu-header">
          <Col id="page-divider">
            <span>Menu header</span>
            <input
              placeholder="Enter country code"
              value={inputCountry}
              onChange={handleInputChange}
            />
            <span className="search-icon-container">
              {/* Use onClick without parentheses to pass a function */}
              <BsSearch className="search-icon" />
            </span>
          </Col>
        </Row>
        {windowWidth < 768 ? (
          <Smallerscreen />
        ) : (
          <Bigscreen />
        )}
      </Container>
    </>
  );
};

export default RocketContainer;
