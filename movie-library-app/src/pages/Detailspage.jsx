import React from "react";
import { useParams } from "react-router-dom";

function DetailsPage({ movies }) {
  const { id } = useParams();
  const movie = movies.find((m) => m.id === id);

  if (!movie) return <h3>Movie not found</h3>;

  return (
    <div className="card shadow p-4">
      <div className="row">
        <div className="col-md-4">
          <img src={movie.poster} className="img-fluid rounded" />
        </div>

        <div className="col-md-8">
          <h2>{movie.title}</h2>
          <p><strong>Year:</strong> {movie.year}</p>
          <p><strong>Genre:</strong> {movie.genre}</p>
          <p><strong>Plot:</strong> {movie.plot}</p>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
