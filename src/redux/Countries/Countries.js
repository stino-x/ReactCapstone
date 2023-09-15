/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

export const fetchCountries = createAsyncThunk('fetchCountries', async (contryCode) => {
  const username = 'austin214'; // Replace with your Geonames username
  const url = `http://api.geonames.org/searchJSON?country=${contryCode}&username=${username}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  // console.log('I HAVE BEEN CALLED', contryCode);

  const data = await response.json();
  const datatarray = data.geonames;
  // console.log('I HAVE BEEN CALLED', data.geonames);
  // const cityInfo = datatarray
  //   .map((city) => ({
  //     cityname: city.toponymName,
  //     latitude: city.lat,
  //     longitude: city.lng,
  //     ISOcode2: city.adminCodes1.ISO3166_2,
  //     population: city.population,
  //   }));
  // console.log('I HAVE BEEN CALLED', cityInfo);
  return datatarray;
});

const initialState = {
  countries: [],
  filteredCountries: [],
};

const Countries = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    filterCities: (state, action) => {
      const { keyword } = action.payload; // Assuming you pass a payload with a keyword
      state.filteredCountries = state.countries.filter((country) => country.cityname.toLowerCase().includes(keyword.toLowerCase()));
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
