import axios from 'axios';

// --- Movie API action constants ---
// --- Auth and Preference Action Constants ---
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_OUT = 'SIGN_OUT';
export const ADD_FAVORITE = 'ADD_FAVORITE';

// --- Movie API action constants ---
export const FETCH_POPULAR_MOVIES_REQUEST = 'FETCH_POPULAR_MOVIES_REQUEST';
export const FETCH_POPULAR_MOVIES_SUCCESS = 'FETCH_POPULAR_MOVIES_SUCCESS';
export const FETCH_POPULAR_MOVIES_FAILURE = 'FETCH_POPULAR_MOVIES_FAILURE';

export const FETCH_MOVIE_DETAILS_REQUEST = 'FETCH_MOVIE_DETAILS_REQUEST';
export const FETCH_MOVIE_DETAILS_SUCCESS = 'FETCH_MOVIE_DETAILS_SUCCESS';
export const FETCH_MOVIE_DETAILS_FAILURE = 'FETCH_MOVIE_DETAILS_FAILURE';

export const SEARCH_MOVIES_REQUEST = 'SEARCH_MOVIES_REQUEST';
export const SEARCH_MOVIES_SUCCESS = 'SEARCH_MOVIES_SUCCESS';
export const SEARCH_MOVIES_FAILURE = 'SEARCH_MOVIES_FAILURE';


// --- Fetch Popular Movies ---
export const fetchPopularMovies = () => async (dispatch) => {
  dispatch({ type: FETCH_POPULAR_MOVIES_REQUEST });
  try {
    const response = await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=YOUR_API_KEY');
    dispatch({ type: FETCH_POPULAR_MOVIES_SUCCESS, payload: response.data.results });
  } catch (error) {
    dispatch({ type: FETCH_POPULAR_MOVIES_FAILURE, payload: error.message });
  }
};

// --- Fetch Movie Details ---
export const fetchMovieDetails = (id) => async (dispatch) => {
  dispatch({ type: FETCH_MOVIE_DETAILS_REQUEST });
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=YOUR_API_KEY&append_to_response=credits`);
    dispatch({ type: FETCH_MOVIE_DETAILS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_MOVIE_DETAILS_FAILURE, payload: error.message });
  }
};

// --- Search Movies ---
export const searchMovies = (query) => async (dispatch) => {
  dispatch({ type: SEARCH_MOVIES_REQUEST });
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&query=${query}`);
    dispatch({ type: SEARCH_MOVIES_SUCCESS, payload: response.data.results });
  } catch (error) {
    dispatch({ type: SEARCH_MOVIES_FAILURE, payload: error.message });
  }
};
