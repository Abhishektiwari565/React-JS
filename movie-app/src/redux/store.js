import { createStore, applyMiddleware, compose } from 'redux';
import * as ReduxThunk from 'redux-thunk'; // Import everything
import rootReducer from './reducers';

const thunk = ReduxThunk.default || ReduxThunk; // works in Vite

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
