/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { useSharedContextforSlice } from '../../Components/ContextProvider/UserContextProvider';

export const fetchCountries = createAsyncThunk('fetchCountries', async () => {
  const { inputCountry } = useSharedContextforSlice();
  const options = {
    method: 'GET',
    url: `https://geography4.p.rapidapi.com/apis/geography/v1/country/name/${inputCountry}`,
    params: {
      limit: '10',
      sortBy: 'name',
      sortOrder: 'asc',
    },
    headers: {
      'X-RapidAPI-Key': '0b6eebabf3mshc5f85d597b457cfp1ab958jsn811499bb29c4',
      'X-RapidAPI-Host': 'geography4.p.rapidapi.com',
    },
  };
  const response = await axios.request(options);
  return response.data;
});

const initialState = {
  missions: [],
};

const Countries = createSlice({
  name: 'missions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCountries.fulfilled, (state, action) => ({
      ...state,
      missions: action.payload,
    }));
  },
});

// const apiKey = '294b967cd6b04078ac7ded19316b344b';
// const apiUrl = 'https://api.ipgeolocation.io/ipgeo';

// // Construct the API URL with the API key as a query parameter
// const requestUrl = `${apiUrl}?apiKey=${apiKey}`;

// // Make the API request
// const locationInfo = async () => {
//   const response = await fetch(requestUrl);
//   const data = await response.json();
//   const dateTimeString = data.current_time;
//   const dateOnlyString = dateTimeString.split(' ')[0];
//   return {
//     countrycode: data.country_code2,
//     time: dateOnlyString,
//   };
// };

// export default locationInfo;

export default Countries.reducer;
// export const { changeStatus } = Countries.actions;
