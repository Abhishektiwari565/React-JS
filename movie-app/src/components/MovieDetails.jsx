import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchMovieDetails, addFavorite } from '../redux/actions';

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Access state
  const { selectedMovie, isLoading, error } = useSelector(state => state.movies);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  // Fetch movie details when component mounts or id changes
  useEffect(() => {
    if (id) {
      dispatch(fetchMovieDetails(id));
    }
  }, [id, dispatch]);

  // Loading state
  if (isLoading || !selectedMovie) {
    return (
      <div className="container mt-5 text-center">
        <h2>Loading Movie Details...</h2>
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

  // Prevent showing old details
  if (selectedMovie.id.toString() !== id) {
    return (
      <div className="container mt-5 text-center">
        <h2>Loading...</h2>
      </div>
    );
  }

  // Handle adding to favorites
  const handleFavorite = () => {
    if (selectedMovie) {
      const favoriteData = {
        id: selectedMovie.id,
        title: selectedMovie.title,
        poster_path: selectedMovie.poster_path,
        release_date: selectedMovie.release_date,
      };
      dispatch(addFavorite(favoriteData));
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Poster */}
        <div className="col-md-4">
          {selectedMovie.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
              className="img-fluid rounded shadow"
              alt={selectedMovie.title}
            />
          )}
        </div>

        {/* Movie Details */}
        <div className="col-md-8">
          <h1 className="display-4">{selectedMovie.title}</h1>
          <p className="lead">{selectedMovie.tagline}</p>
          <hr />

          <p><strong>Release Date:</strong> {selectedMovie.release_date}</p>

          <p>
            <strong>Genres:</strong>{" "}
            {selectedMovie.genres && selectedMovie.genres.map(g => (
              <span key={g.id} className="badge bg-secondary me-2">{g.name}</span>
            ))}
          </p>

          <h4 className="mt-4">Overview</h4>
          <p>{selectedMovie.overview}</p>

          <h4 className="mt-4">Cast</h4>
          <div className="d-flex flex-wrap">
            {selectedMovie.credits && selectedMovie.credits.cast.slice(0, 5).map(member => (
              <span key={member.cast_id} className="badge bg-info text-dark me-2 mb-2">
                {member.name} ({member.character})
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="mt-4">
            <Link to="/" className="btn btn-primary me-2">← Back to List</Link>
            {isAuthenticated && (
              <button className="btn btn-warning" onClick={handleFavorite}>
                ⭐️ Add to Favorites
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
