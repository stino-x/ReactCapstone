/* eslint-disable react/no-array-index-key */
import React, { useContext } from 'react';
import './Bigscreen.css';
import Row from 'react-bootstrap/Row';
import { useSelector } from 'react-redux';
import Col from 'react-bootstrap/Col';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { UserContext } from '../ContextProvider/UserContextProvider';

export default function Bigscreen() {
  const countries = useSelector((state) => state.CurrentLocation.countries);
  const filteredcountries = useSelector((state) => state.CurrentLocation.filteredCountries);
  // const dispatch = useDispatch();
  const {
    inputCountry,
    // changevalueofCountry,
    // selectedContinent,
  } = useContext(UserContext);

  return (
    <>
      {/* Conditional rendering based on the presence of countriesToRender */}
      {inputCountry !== '' ? (
        filteredcountries.map((item, position) => (
          <Row className="row-1" md={4} key={position}>
            <Col>{item.countryname}</Col>
            <Col md={6} sm={6} />
            <Col>
              <span><img src={item.countryflag} alt="flag" /></span>
              <span className="arrow-container">
                <BsFillArrowRightCircleFill />
              </span>
            </Col>
          </Row>
        ))
      ) : (
        countries.map((item, position) => (
          <Row className="row-1" md={4} key={position}>
            <Col>{item.countryname}</Col>
            <Col md={6} sm={6} />
            <Col>
              <span><img src={item.countryflag} alt="flag" /></span>
              <span className="arrow-container">
                <BsFillArrowRightCircleFill />
              </span>
            </Col>
          </Row>
        ))
      )}
    </>
  );
}
