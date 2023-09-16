// asyncThunk.test.js
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchCurrentLocation } from '../redux/Current-Location/CurrentLocation';

const mock = new MockAdapter(axios);

describe('fetchCurrentLocation async thunk', () => {
  it('fetchCurrentLocation thunk should return a continent', async () => {
    const responseData = 'SomeContinent'; // Mock response data
    const apiKey = '294b967cd6b04078ac7ded19316b344b';
    const apiUrl = 'https://api.ipgeolocation.io/ipgeo';

    // Mock the Axios request to return the data
    mock.onGet(`${apiUrl}?apiKey=${apiKey}`).reply(200, { continent_name: responseData });

    const result = await fetchCurrentLocation(null);

    expect(result).toEqual(responseData);
  });

  it('fetchCurrentLocation thunk should handle a selected place', async () => {
    const selectedPlace = 'SelectedPlace'; // Mock selected place
    const responseData = 'SelectedContinent'; // Mock response data

    const result = await fetchCurrentLocation(selectedPlace);

    expect(result).toEqual(responseData);
  });
});
