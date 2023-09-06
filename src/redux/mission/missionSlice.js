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

export default missionsSlice.reducer;
export const { changeStatus } = missionsSlice.actions;
