import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchMovies } from '../redux/actions';
import { Link } from 'react-router-dom';

const MovieSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const { searchResults, isLoading, error } = useSelector(state => state.movies);

  // Handle user typing in search box
  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchTerm(query);

    if (query.length > 2) {
      dispatch(searchMovies(query));
    }
    // Optional: clear results if searchTerm is empty
    // else if (query.length === 0) {
    //   dispatch(clearSearchResults());
    // }
  };

  // Render search results or messages
  const renderContent = () => {
    if (isLoading) {
      return <div className="text-center mt-5"><h4>Searching...</h4></div>;
    }

    if (error) {
      return <div className="alert alert-danger mt-3">{error}</div>;
    }

    if (searchResults.length === 0 && searchTerm.length > 2) {
      return <div className="text-center mt-5">No results found for "{searchTerm}".</div>;
    }

    return (
      <div className="row mt-4">
        {searchResults.map(movie => (
          <div key={movie.id} className="col-md-3 mb-4">
            <div className="card h-100 shadow-sm">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className="card-img-top"
                  alt={movie.title}
                />
              ) : (
                <div
                  className="card-img-top d-flex align-items-center justify-content-center bg-secondary text-white"
                  style={{ height: '375px' }}
                >
                  No Image
                </div>
              )}

              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text text-muted mb-2">
                  Year: {movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'}
                </p>
                <Link to={`/movie/${movie.id}`} className="btn btn-info btn-sm mt-auto">
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Movie Search</h2>
      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {renderContent()}
    </div>
  );
};

export default MovieSearch;
