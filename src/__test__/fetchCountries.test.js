import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchCountries } from '../redux/Countries/Countries';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const mock = new MockAdapter(axios);

describe('fetchCountries async thunk', () => {
  it('dispatches the correct actions on success', async () => {
    const store = mockStore({});
    // Mock response data
    const responseData = [
      { name: 'City 1' },
      { name: 'City 2' },
    ];

    // Mock the Axios request to return the data
    mock.onGet(/api.countrystatecity.in/).reply(200, responseData);

    // Dispatch the async thunk
    await store.dispatch(fetchCountries('someCountryCode'));

    const actions = store.getActions();
    expect(actions[0].type).toEqual(fetchCountries.pending.type);
    expect(actions[1].type).toEqual(fetchCountries.fulfilled.type);
    expect(actions[1].payload).toEqual(responseData);
  });
});
