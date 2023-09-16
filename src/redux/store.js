import { configureStore } from '@reduxjs/toolkit';
import CurrentLocationReducer from './Current-Location/CurrentLocation';
import Countriesreducer from './Countries/Countries';
import Weatherreducer from './Weather-redux/Weatherforstore';

export default configureStore({
  reducer: {
    CurrentLocation: CurrentLocationReducer,
    Countries: Countriesreducer,
    Weather: Weatherreducer,
  },
});
