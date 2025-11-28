import { combineReducers } from 'redux';
import { SIGN_IN_SUCCESS, SIGN_OUT, ADD_FAVORITE } from './actions';
import {
  FETCH_POPULAR_MOVIES_REQUEST,
  FETCH_POPULAR_MOVIES_SUCCESS,
  FETCH_POPULAR_MOVIES_FAILURE,
  FETCH_MOVIE_DETAILS_REQUEST,
  FETCH_MOVIE_DETAILS_SUCCESS,
  FETCH_MOVIE_DETAILS_FAILURE,
  SEARCH_MOVIES_REQUEST,
  SEARCH_MOVIES_SUCCESS,
  SEARCH_MOVIES_FAILURE,
} from './actions'; // Make sure these are defined in actions.js

// --- Movies Reducer ---
const moviesInitialState = {
  popularMovies: [],
  selectedMovie: null,
  searchResults: [],
  isLoading: false,
  error: null,
};

const movieReducer = (state = moviesInitialState, action) => {
  switch (action.type) {
    case FETCH_POPULAR_MOVIES_REQUEST:
    case FETCH_MOVIE_DETAILS_REQUEST:
    case SEARCH_MOVIES_REQUEST:
      return { ...state, isLoading: true, error: null };

    case FETCH_POPULAR_MOVIES_SUCCESS:
      return { ...state, isLoading: false, popularMovies: action.payload };

    case FETCH_MOVIE_DETAILS_SUCCESS:
      return { ...state, isLoading: false, selectedMovie: action.payload };

    case SEARCH_MOVIES_SUCCESS:
      return { ...state, isLoading: false, searchResults: action.payload };

    case FETCH_POPULAR_MOVIES_FAILURE:
    case FETCH_MOVIE_DETAILS_FAILURE:
    case SEARCH_MOVIES_FAILURE:
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
};

// --- Auth Reducer ---
const authInitialState = {
  isAuthenticated: false,
  user: null,
  favoriteMovies: [], // Save user preferences
  watchList: [],
};

const authReducer = (state = authInitialState, action) => {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return { ...state, isAuthenticated: true, user: action.payload };

    case SIGN_OUT:
      return { ...state, isAuthenticated: false, user: null, favoriteMovies: [], watchList: [] };

    case ADD_FAVORITE:
      if (state.favoriteMovies.find(movie => movie.id === action.payload.id)) {
        return state; // Avoid duplicates
      }
      return { ...state, favoriteMovies: [...state.favoriteMovies, action.payload] };

    default:
      return state;
  }
};

// --- Combine Reducers ---
export default combineReducers({
  movies: movieReducer,
  auth: authReducer,
});
