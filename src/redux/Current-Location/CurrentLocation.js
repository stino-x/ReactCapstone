/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const apiKey = '294b967cd6b04078ac7ded19316b344b';
const apiUrl = 'https://api.ipgeolocation.io/ipgeo';
const mapboxapikey = 'pk.eyJ1IjoiYXVzdGluMjE0IiwiYSI6ImNsbWF6ZnFwcTBzMmMzdHRmZGx0ZzBlNW0ifQ.zuxjFgJlzWzwki9X4fHWMA';

// Create an async thunk to fetch the current location
// Create an async thunk to fetch the current location
export const fetchCurrentLocation = createAsyncThunk(
  'rockets/fetchCurrentLocation',
  async (selectedplace) => {
    let continent = selectedplace; // Replace with your desired continent

    // If selectedplace is not provided, fetch the continent from the API
    if (!selectedplace) {
      const requestUrl = `${apiUrl}?apiKey=${apiKey}`;
      const response = await fetch(requestUrl);
      const data = await response.json();
      continent = data.continent_name;
    }

    // Return the continent (or data) as the result of the async thunk
    return continent;
  },
);

// Create an instance of Axios
// const api = axios.create({
//   baseURL: 'https://geography4.p.rapidapi.com/apis/geography/v1',
//   headers: {
//     'x-rapidapi-key': 'YOUR_API_KEY',
//   },
// });

// Apply rate limiting to the Axios instance
// const limitedApi = rateLimit(api, {
//   maxRequests: 5, // Maximum number of requests allowed
//   perMilliseconds: 1000, // Time window in milliseconds
// });

// Function to extract flag data
// const extractFlag = async (countryname) => {
//   const response = await
//  limitedApi.get(`/country/name/${countryname}?limit=10&sortOrder=asc&sortBy=name`);
//   const { data } = response;
//   const flag = data.flags.svg;
//   return flag;
// };

// Example usage
// const fetchFlagForCountry = async (countryname) => {
//   const flag = await extractFlag(countryname);
//   console.log(`Flag for ${countryname}: ${flag}`);
// };
// const formatCountryName = (countryName) =>
// (countryName.includes('-') ? countryName.split('-').join('%20') : countryName);

export const fetchCurrentLocationCountries = createAsyncThunk(
  'rockets/fetchCurrentLocationCountries',
  async (selectedplace) => {
    let continent = selectedplace || '';

    if (selectedplace && selectedplace.includes('-')) {
      continent = selectedplace.replace(/-/g, ' ');
    } else if (!selectedplace) {
      const requestUrl = `${apiUrl}?apiKey=${apiKey}`;
      const response = await fetch(requestUrl);
      const data = await response.json();
      continent = data.continent_name;
    }

    const url = 'https://restcountries.com/v3.1/all';

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch country data');
    }

    const data = await response.json();

    // Filter countries by continent
    const countriesInContinent = data.filter((country) => country.continents[0] === continent);

    const countryDataPromises = countriesInContinent.map((country) => ({
      countryname: country.name.common,
      countryflag: country.flags.svg,
    }));

    return countryDataPromises;
  },
);

// Function to convert a Blob to a base64 string
const blobToBase64 = async (blob) => new Promise((resolve) => {
  const reader = new FileReader();
  reader.onload = () => {
    const base64String = reader.result.split(',')[1];
    resolve(base64String);
  };
  reader.readAsDataURL(blob);
});

export const fetchCurrentLocationImage = createAsyncThunk(
  'rockets/fetchCurrentLocationImage',
  async (selectedcontinent) => {
    if (!selectedcontinent) {
      const requestUrl = `${apiUrl}?apiKey=${apiKey}`;
      const response = await fetch(requestUrl);
      const data = await response.json();

      if (!response.ok) {
        // Handle the error if the API request fails
        throw new Error('Failed to fetch current location data');
      }

      const request2 = `https://api.mapbox.com/styles/v1/mapbox/streets-v12/static/${data.longitude},${data.latitude},1.08,0/400x300?access_token=${mapboxapikey}`;
      const response2 = await fetch(request2);

      if (!response2.ok) {
        // Handle the error if the second API request fails
        throw new Error('Failed to fetch map image');
      }

      const imageBlob = await response2.blob(); // Assuming the response contains image data
      const imageBase64 = await blobToBase64(imageBlob); // Convert Blob to base64

      return imageBase64; // Return the base64 image string
    }

    // Return a default value when selectedcontinent is falsy
    return null;
  },
);

const initialState = [
  {
    continent: 'Default Continent',
    image: null,
    countries: [],
    filteredCountries: [],
  },
];

export const CurrentLocationSlice = createSlice({
  name: 'rocket',
  initialState,
  reducers: {
    filterCountries: (state, action) => {
      const { keyword } = action.payload; // Assuming you pass a payload with a keyword
      state.filteredCountries = state.countries.filter((country) => country.countryname.toLowerCase().includes(keyword.toLowerCase()));
    }
    ,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentLocation.fulfilled, (state, action) => ({
      ...state,
      continent: action.payload,
    }));
    builder.addCase(fetchCurrentLocationImage.fulfilled, (state, action) => ({
      ...state,
      image: action.payload,
    }));
    builder.addCase(fetchCurrentLocationCountries.fulfilled, (state, action) => ({
      ...state,
      countries: action.payload,
    }));
  },
});

export const { filterCountries } = CurrentLocationSlice.actions;

export default CurrentLocationSlice.reducer;
