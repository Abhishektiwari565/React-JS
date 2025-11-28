import React, { useState } from "react";
import { Link } from "react-router-dom";

function Home({ movies, setMovies }) {
  const [search, setSearch] = useState("");

  const handleDelete = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  const filtered = movies.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Movie List</h2>

      <div className="input-group mb-3">
        <input 
          className="form-control"
          placeholder="Search movie..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="row">
        {filtered.map((movie) => (
          <div className="col-md-4 mb-4" key={movie.id}>
            <div className="card shadow">
              <img src={movie.poster} className="card-img-top" />

              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="text-muted">{movie.year}</p>

                <Link to={`/movie/${movie.id}`} className="btn btn-primary me-2">
                  Details
                </Link>

                <Link to={`/edit/${movie.id}`} className="btn btn-warning me-2">
                  Edit
                </Link>

                <button className="btn btn-danger" onClick={() => handleDelete(movie.id)}>
                  Delete
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;