import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EditMovie({ movies, setMovies }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const movie = movies.find((m) => m.id === id);

  const [form, setForm] = useState(movie);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    setMovies(movies.map((m) => (m.id === id ? form : m)));
    navigate("/");
  };

  return (
    <div>
      <h2>Edit Movie</h2>

      <input name="title" className="form-control mb-3" value={form.title} onChange={handleChange} />
      <input name="year" className="form-control mb-3" value={form.year} onChange={handleChange} />
      <input name="genre" className="form-control mb-3" value={form.genre} onChange={handleChange} />
      <input name="poster" className="form-control mb-3" value={form.poster} onChange={handleChange} />
      <textarea name="plot" className="form-control mb-3" value={form.plot} onChange={handleChange} />

      <button className="btn btn-primary" onClick={handleUpdate}>
        Update Movie
      </button>
    </div>
  );
}

export default EditMovie;
