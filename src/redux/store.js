import { configureStore } from '@reduxjs/toolkit';
import rocketReducer from './rocket/rocketSlice';
import missionsSlicereducer from './mission/missionSlice';

export default configureStore({
  reducer: {
    rocket: rocketReducer,
    missions: missionsSlicereducer,
  },
});
