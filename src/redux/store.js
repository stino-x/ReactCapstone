import { configureStore } from '@reduxjs/toolkit';
import CurrentLocationReducer from './Current-Location/CurrentLocation';
import Countriesreducer from './Countries/Countries';

export default configureStore({
  reducer: {
    CurrentLocation: CurrentLocationReducer,
    Countries: Countriesreducer,
  },
});
