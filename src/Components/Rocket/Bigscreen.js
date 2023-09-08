/* eslint-disable react/no-array-index-key */
import React, { useContext } from 'react';
import './Bigscreen.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import { UserContext } from '../ContextProvider/UserContextProvider';

export default function Bigscreen() {
  const { dummyArray } = useContext(UserContext);
  return (
    <>
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
    </>
  );
}
