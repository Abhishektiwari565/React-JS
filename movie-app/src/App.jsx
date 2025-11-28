import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

// Import all components
import Navbar from './components/navbar';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import MovieSearch from './components/MovieSearch';
import PrivateRoute from './components/PrivateRoute';
import SignIn from './components/SignIn'; // Replace placeholder with real SignIn

// Placeholder for UserProfile/Preferences
const UserProfile = () => (
  <div className="container mt-5">
    <h2>User Profile/Preferences</h2>
    <p>This page will display favorite movies and watchlists.</p>
  </div>
);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar /> {/* Always visible */}
        <div className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<MovieList />} />
            <Route path="/search" element={<MovieSearch />} />
            <Route path="/signin" element={<SignIn />} />

            {/* Protected Routes */}
            <Route
              path="/movie/:id"
              element={
                <PrivateRoute>
                  <MovieDetails />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <UserProfile />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
