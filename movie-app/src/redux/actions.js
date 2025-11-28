// --- Action Type Constants ---
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
export const SIGN_OUT = 'SIGN_OUT';
export const ADD_FAVORITE = 'ADD_FAVORITE';

// --- Mock Authentication Actions ---

/**
 * Mock Sign In Action
 * In a real app, this would call an API to verify credentials
 */
export const signIn = (username, password) => (dispatch) => {
  if (username === 'test' && password === '123') {
    dispatch({ 
      type: SIGN_IN_SUCCESS, 
      payload: { userId: 1, username } 
    });
    alert('Sign In Successful!');
  } else {
    alert('Invalid credentials. Use test/123.');
  }
};

/**
 * Mock Sign Out Action
 * Clears authentication state
 */
export const signOut = () => (dispatch) => {
  dispatch({ type: SIGN_OUT });
  // Redirection handled in Navbar or Router
};

/**
 * Add Movie to Favorites
 */
export const addFavorite = (movie) => (dispatch) => {
  dispatch({ type: ADD_FAVORITE, payload: movie });
  alert(`${movie.title} added to favorites!`);
};
