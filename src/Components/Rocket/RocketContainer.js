import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';
import RocketList from './RocketList';
import { fetchRocketsData } from '../../redux/rocket/rocketSlice';
import './Rocket.css';

let saveReservedAPI = false;

const RocketContainer = () => {
  const rockets = useSelector((state) => state.rocket);

  const dispatch = useDispatch();

  useEffect(() => {
    if (saveReservedAPI === false) {
      saveReservedAPI = true;
      dispatch(fetchRocketsData());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <RocketList rockets={rockets} />
    </Container>
  );
};

export default RocketContainer;
