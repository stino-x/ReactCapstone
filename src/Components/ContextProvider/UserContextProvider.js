/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
// UserContext.js
import {
  createContext, useContext,
} from 'react';
import PropTypes from 'prop-types';

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  // const storedTodos = localStorage.getItem('activities');
  // const initialState = storedTodos ? JSON.parse(storedTodos) : [];
  // const [state, dispatch] = useReducer(reducer, initialState);
  // useEffect(() => {
  //   localStorage.setItem('activities', JSON.stringify(state));
  // }, [state]);

  const contextValue = {
    dummyArray: [2, 9, 14, 16, 17],
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

const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }
  return context;
};

export { UserContextProvider, useUserContext, UserContext };
