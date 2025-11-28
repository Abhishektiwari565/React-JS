import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddMovie({ setMovies }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    id: Date.now().toString(),
    title: "",
    year: "",
    genre: "",
    poster: "",
    plot: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setMovies((prev) => [...prev, form]);
    navigate("/");
  };

  return (
    <div>
      <h2>Add New Movie</h2>

      <input name="title" className="form-control mb-3" placeholder="Title" onChange={handleChange} />
      <input name="year" className="form-control mb-3" placeholder="Year" onChange={handleChange} />
      <input name="genre" className="form-control mb-3" placeholder="Genre" onChange={handleChange} />
      <input name="poster" className="form-control mb-3" placeholder="Poster URL" onChange={handleChange} />
      <textarea name="plot" className="form-control mb-3" placeholder="Plot" onChange={handleChange} />

      <button className="btn btn-success" onClick={handleSubmit}>
        Add Movie
      </button>
    </div>
  );
}

export default AddMovie;
