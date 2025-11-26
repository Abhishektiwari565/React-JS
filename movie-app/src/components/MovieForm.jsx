import React, { useState } from "react";

export default function MovieForm({ addMovie }) {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !genre || !rating) return alert("Please fill all fields");
    addMovie({ title, genre, rating });
    setTitle("");
    setGenre("");
    setRating("");
  };

  return (
    <form className="mb-3" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Movie Title"
        value={title}
        className="form-control mb-2"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Genre"
        value={genre}
        className="form-control mb-2"
        onChange={(e) => setGenre(e.target.value)}
      />
      <input
        type="number"
        placeholder="Rating (1-10)"
        value={rating}
        className="form-control mb-2"
        onChange={(e) => setRating(e.target.value)}
      />
      <button type="submit" className="btn btn-primary w-100">Add Movie</button>
    </form>
  );
}