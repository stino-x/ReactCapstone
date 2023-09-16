/* eslint-disable import/extensions */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './Components/Navigation/Navigation';
import Container from './Components/Landing/Container';
import Weather from './Components/Weather/Weather';
import { UserContextProvider } from './Components/ContextProvider/UserContextProvider';
import Cities from './Components/Cities/Cities';

function App() {
  return (
    <UserContextProvider>
      <>
        <Navigation />
        <Routes>
          <Route exact path="/" element={<Container />} />
          <Route path="/cities" element={<Cities />} />
          <Route path="/weather" element={<Weather />} />
        </Routes>
      </>
    </UserContextProvider>
  );
}

export default App;
