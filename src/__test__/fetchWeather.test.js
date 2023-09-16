// asyncThunk.test.js
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchweather } from '../redux/Weather-redux/Weatherforstore';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const mock = new MockAdapter(axios);

describe('fetchweather async thunk', () => {
  it('dispatches the correct actions on success', async () => {
    const store = mockStore({});
    const responseData = { /* Mock response data here */ };

    // Mock the Axios request to return the data
    mock.onGet(/api.weatherapi.com/).reply(200, responseData);

    await store.dispatch(fetchweather('someCountryCode'));

    const actions = store.getActions();
    expect(actions[0].type).toEqual(fetchweather.pending.type);
    expect(actions[1].type).toEqual(fetchweather.fulfilled.type);
    expect(actions[1].payload).toEqual(responseData);
  });
});
