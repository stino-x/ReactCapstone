/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
// UserContext.js
import {
  createContext, useContext, useState,
} from 'react';
import PropTypes from 'prop-types';

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [inputCountry, setCountryValue] = useState('');
  const [inputContinent, setContinentValue] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('');
  const [cityInput, setcityInput] = useState('');
  const [contryCode, setcontryCode] = useState('');
  const [countrytodisplayinsecondpage, setcountrytodisplayinsecondpage] = useState('');

  // Handler function to update the selected continent when an option is chosen
  const handleContinentChange = (event) => {
    setSelectedContinent(event.target.value);
  };
  const changevalueofContinent = (event) => {
    setContinentValue(event.target.value);
  };
  // const storedTodos = localStorage.getItem('activities');
  // const initialState = storedTodos ? JSON.parse(storedTodos) : [];
  // const [state, dispatch] = useReducer(reducer, initialState);
  // useEffect(() => {
  //   localStorage.setItem('activities', JSON.stringify(state));
  // }, [state]);

  const contextValue = {
    dummyArray: [2, 9, 14, 16, 17],
    inputContinent,
    contryCode,
    setcontryCode,
    inputCountry,
    cityInput,
    setcityInput,
    setCountryValue,
    changevalueofContinent,
    selectedContinent,
    handleContinentChange,
    countrytodisplayinsecondpage,
    setcountrytodisplayinsecondpage,
    continents: [
      'Africa',
      'Antarctica',
      'Asia',
      'Europe',
      'North America',
      'Australia (Oceania)',
      'South America',
    ],
    continentMaps: {
      Africa: 'public/Assets/Africa_unnamed_colour.jpg',
      Antarctica: 'public/Assets/Antarctica_unnamed_colour.jpg',
      Asia: 'public/Assets/Asia_unnamed_colour.jpg',
      Europe: 'public/Assets/Europe_unnamed_colour.jpg',
      NorthAmerica: 'public/Assets/NAmerica_unnamed_colour.jpg',
      AustraliaOceania: 'public/Assets/Oceania_unnamed_colour.jpg',
      SouthAmerica: 'public/Assets/SAmerica_unnamed_colour.jpg',
    },
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useSharedContextforSlice = () => {
  useContext(UserContext);
};

export { UserContextProvider, useSharedContextforSlice, UserContext };
