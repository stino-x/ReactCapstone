/* eslint-disable react/no-array-index-key */
import React, { useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
// import RocketList from './RocketList'
import './Rocket.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { fetchRocketsData } from '../../redux/rocket/rocketSlice';
import { UserContext } from '../ContextProvider/UserContextProvider';

let saveReservedAPI = false;

const RocketContainer = () => {
  // const rockets = useSelector((state) => state.rocket);
  const { dummyArray } = useContext(UserContext);

  const dispatch = useDispatch();

  useEffect(() => {
    if (saveReservedAPI === false) {
      saveReservedAPI = true;
      dispatch(fetchRocketsData());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div>selected continent</div>
      <Container className="contaner">
        <Row id="menu-header">
          <Col>Menu header</Col>
        </Row>
        {dummyArray.map((item, position) => (
          <Row className="row-1" md={4} key={position}>
            <Col>Country</Col>
            <Col md={6} sm={6} />
            <Col>
              3 of 3
              <span className="arrow-container">
                <BsFillArrowRightCircleFill />
              </span>
            </Col>
          </Row>
        ))}
      </Container>
    </>
  );
};

export default RocketContainer;
