/* eslint-disable import/extensions */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './Components/Navigation/Navigation';
import Container from './Components/PageBody/Container';
import MyProfile from './Components/Profile/myProfile';
import { UserContextProvider } from './Components/ContextProvider/UserContextProvider';
import Cities from './Components/Mission/Cities';

function App() {
  return (
    <UserContextProvider>
      <>
        <Navigation />
        <Routes>
          <Route exact path="/" element={<Container />} />
          <Route path="/cities" element={<Cities />} />
          <Route path="/myProfile" element={<MyProfile />} />
        </Routes>
      </>
    </UserContextProvider>
  );
}

export default App;
