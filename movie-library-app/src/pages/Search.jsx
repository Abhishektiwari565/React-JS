import React, { useState } from "react";
import { searchMovies } from "../api";
import { Link } from "react-router-dom";

function Search() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSearch = () => {
    setMovies(searchMovies(query));
  };

  return (
    <div>
      <h2 className="mb-3">Search Movies</h2>

      <div className="input-group mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Enter movie name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-danger" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="row">
        {movies.map((movie) => (
          <div className="col-md-4 mb-4" key={movie.id}>
            <div className="card shadow-sm">
              <img
                src={movie.poster}
                className="card-img-top"
                alt={movie.title}
              />
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <Link className="btn btn-primary" to={`/movie/${movie.id}`}>
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {movies.length === 0 && query !== "" && (
        <p className="text-danger">No movies found.</p>
      )}
    </div>
  );
}

export default Search;
