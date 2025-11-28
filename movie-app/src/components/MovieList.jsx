import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPopularMovies } from '../redux/actions';
import { Link } from 'react-router-dom';

const MovieList = () => {
  const dispatch = useDispatch();

  // Access data from Redux store
  const { popularMovies, isLoading, error } = useSelector(state => state.movies);

  // Fetch popular movies on component mount
  useEffect(() => {
    dispatch(fetchPopularMovies());
  }, [dispatch]);

  // Loading state
  if (isLoading && popularMovies.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h2>Loading Movies...</h2>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mt-5 alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Popular Movies</h2>
      <div className="row">
        {popularMovies.map(movie => (
          <div key={movie.id} className="col-md-3 mb-4">
            <div className="card h-100 shadow-sm">
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className="card-img-top"
                  alt={movie.title}
                />
              ) : (
                <div className="card-img-top d-flex align-items-center justify-content-center bg-secondary text-white" style={{height: '375px'}}>
                  No Image
                </div>
              )}

              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text text-muted mb-2">Rating: {movie.vote_average}</p>
                <Link to={`/movie/${movie.id}`} className="btn btn-primary btn-sm mt-auto">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fallback if no movies loaded but no error */}
      {popularMovies.length === 0 && !isLoading && (
        <div className="text-center mt-5">No popular movies found. Check your API key.</div>
      )}
    </div>
  );
};

export default MovieList;
