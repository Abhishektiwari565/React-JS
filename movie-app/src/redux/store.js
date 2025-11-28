import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'; // Correct import (no curly braces)
import rootReducer from './reducers'; // Import the combined reducers

// Enable Redux DevTools Extension if available
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create the Redux store
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
