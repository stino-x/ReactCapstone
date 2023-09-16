/* eslint-disable react/no-array-index-key */
import React, { useContext, useEffect } from 'react';
import './biggerscreen.css';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { UserContext } from '../ContextProvider/UserContextProvider';
import { fetchweather } from '../../redux/Weather-redux/Weatherforstore';

export default function Bigscreencomp() {
  const cities = useSelector((state) => state.Countries.countries);
  const filteredcountries = useSelector((state) => state.Countries.filteredCountries);
  const dispatch = useDispatch();
  const {
    cityInput,
    setweathercountry,
    setcountrytodisplayinsecondpage,
  } = useContext(UserContext);
  useEffect(() => {
    const storedData = localStorage.getItem('countrytodisplayinsecondpage');
    const parsedData = JSON.parse(storedData);

    if (parsedData) {
      setcountrytodisplayinsecondpage(parsedData.countryname);
    }
  }, [setcountrytodisplayinsecondpage, dispatch]);
  // let content;
  return (
    <>
      {/* Conditional rendering based on the presence of countriesToRender */}
      {cityInput !== '' ? (
        filteredcountries.map((item) => (
          <Link
            to="/weather"
            key={item.id}
            onClick={async () => {
              setweathercountry(item.name);
              localStorage.setItem('countrytoshowweather', JSON.stringify({ weatherlocation: item.name }));
              await dispatch(fetchweather(item.name));
            }}
          >
            <Row className="row-1" md={4} key={item.id}>
              <Col>{item.name}</Col>
              <Col md={6} sm={6} />
              <Col>
                {/* <span><img src={item.countryflag} alt="flag" /></span> */}
                <span className="arrow-container">
                  <BsFillArrowRightCircleFill />
                </span>
              </Col>
            </Row>
          </Link>
        ))
      ) : (
        cities.map((item) => (
          <Link
            to="/weather"
            key={item.id}
            onClick={async () => {
              setweathercountry(item.name);
              localStorage.setItem('countrytoshowweather', JSON.stringify({ weatherlocation: item.name }));
              await dispatch(fetchweather(item.name));
            }}
          >
            <Row className="row-1" md={4} key={item.id}>
              <Col>{item.name}</Col>
              <Col md={6} sm={6} />
              <Col>
                {/* <span><img src={item.countryflag} alt="flag" /></span> */}
                <span className="arrow-container">
                  <BsFillArrowRightCircleFill />
                </span>
              </Col>
            </Row>
          </Link>
        ))
      )}
    </>
  );
}
