/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchCountries = createAsyncThunk('fetchCountries', async (contryCode) => {
  const config = {
    method: 'get',
    url: `https://api.countrystatecity.in/v1/countries/${contryCode}/cities`,
    headers: {
      'X-CSCAPI-KEY': 'VWlxRkNSNUlHYW01bVh6RDBVZEZiRlBibnJld0NPTmRDWlMzUU1YTA==',
    },
  };

  const response = await axios(config);
  return response.data;
});

const initialState = {
  countries: [],
  filteredCountries: [],
  weather: [],
};

const Countries = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    filterCities: (state, action) => {
      const { keyword } = action.payload; // Assuming you pass a payload with a keyword
      state.filteredCountries = state.countries.filter((country) => country.name.toLowerCase().includes(keyword.toLowerCase()));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCountries.fulfilled, (state, action) => ({
      ...state,
      countries: action.payload,
    }));
  },
});

// 97d191eae23478636455005959f12bf5  weather api key

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
export const { filterCities } = Countries.actions;

export default Countries.reducer;
