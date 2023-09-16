/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchweather = createAsyncThunk('fetchweather', async (contryCode) => {
  const APIkey = '34c8c8a46f0741a48cc201814231509';
  const response = await axios.get(
    `http://api.weatherapi.com/v1/current.json?key=${APIkey}&q=${contryCode}&aqi=yes`,
  );

  return response.data;
});

const initialState = {
  Weather: [],
};

const Weather = createSlice({
  name: 'Weather',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(fetchweather.fulfilled, (state, action) => ({
      ...state,
      Weather: action.payload,
    }));
  },
});

export default Weather.reducer;
