/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';
// import RocketList from './RocketList'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import { fetchRocketsData } from '../../redux/rocket/rocketSlice';
// import { UserContext } from '../ContextProvider/UserContextProvider';
import Bigscreen from './Bigscreen';
import Smallerscreen from './Smallerscreen';

// let saveReservedAPI = false;

const RocketContainer = () => {
  // const rockets = useSelector((state) => state.rocket);
  // const { dummyArray } = useContext(UserContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // const dispatch = useDispatch();

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div id="selected">
        <div>Country map</div>
        <div><span>Country Name</span></div>
      </div>
      <Container className="contaner">
        <Row id="menu-header">
          <Col>Menu header</Col>
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
