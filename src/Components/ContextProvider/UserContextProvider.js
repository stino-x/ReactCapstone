/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
// UserContext.js
import {
  createContext, useReducer, useContext, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import {
  ADD_TODO, CLEARALL, EDIT_TODO, INIT_TODO, REMOVE_ALL_COMPLETED, REMOVE_TODO, UPDATE_TODO,
} from './Actiontypes';
import {
  addTodo, clearAll, editTodo, removeTodo, updateTodo,
} from './Dispatch';

const UserContext = createContext();
const reducer = (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, action.payload];
    case REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.payload.id).map((todo, index) => ({
        ...todo,
        index: index + 1,
        id: index + 1,
      }));
    case INIT_TODO:
      return action.payload;
    case UPDATE_TODO:
      return state.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      });
    case EDIT_TODO:
      return state.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            description: action.payload.value,
          };
        }
        return todo;
      });
    case CLEARALL:
      return state.filter((todo) => !todo.completed).map((todo, index) => ({
        ...todo,
        index: index + 1,
        id: index + 1,
        completed: false,
      }));
    case REMOVE_ALL_COMPLETED:
      return state.filter((todo) => !todo.completed);
    default:
      return state;
  }
};

const UserContextProvider = ({ children }) => {
  const storedTodos = localStorage.getItem('activities');
  const initialState = storedTodos ? JSON.parse(storedTodos) : [];
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state));
  }, [state]);

  const contextValue = {
    state,
    addTodo: (description, numberOfItems, anotherNumberOfItems) => {
      dispatch(addTodo(description, numberOfItems, anotherNumberOfItems)); // Assign the current counter value as the index
      // setCounter((prevCounter) => prevCounter + 1); // Increment the counter for the next task
    },
    removeTodo: (todoId, todoIndex) => dispatch(removeTodo(todoId, todoIndex)),
    updateTodo: (todoId) => dispatch(updateTodo(todoId)),
    ClearAll: () => dispatch(clearAll()),
    EditTodo: (todoid, value) => dispatch(editTodo(todoid, value)),
    removeAllCompleted: () => dispatch({ type: REMOVE_ALL_COMPLETED }),
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

export { UserContextProvider, useUserContext };
