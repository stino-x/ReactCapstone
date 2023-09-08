import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './Components/Navigation/Navigation';
import RocketContainer from './Components/Rocket/RocketContainer';
import MyProfile from './Components/Profile/myProfile';
import Landingpage from './Components/Mission/Landingpage';
import { UserContextProvider } from './Components/ContextProvider/UserContextProvider';

function App() {
  return (
    <UserContextProvider>
      <>
        <Navigation />
        <Routes>
          <Route exact path="/" element={<RocketContainer />} />
          <Route path="/mission" element={<Landingpage />} />
          <Route path="/myProfile" element={<MyProfile />} />
        </Routes>
      </>
    </UserContextProvider>
  );
}

export default App;
