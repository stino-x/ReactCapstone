import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const apiURLlink = 'https://api.spacexdata.com/v3';

export const fetchMission = createAsyncThunk('fetchMissions', async () => {
  const response = await axios.get(`${apiURLlink}/missions`);
  const missions = response.data;
  const missionData = missions.map((mission) => ({
    id: mission.mission_id,
    name: mission.mission_name,
    description: mission.description,
    reserved: false,
  }));
  return missionData;
});

const initialState = {
  missions: [],
};

const missionsSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {
    changeStatus: (state, action) => {
      state.missions = state.missions.map((rocket) => {
        if (action.payload === rocket.id) {
          return { ...rocket, reserved: !rocket.reserved };
        }
        return rocket;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMission.fulfilled, (state, action) => ({
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

export default missionsSlice.reducer;
export const { changeStatus } = missionsSlice.actions;
