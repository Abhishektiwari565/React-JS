import React, { useState } from "react";

export default function MovieList({ movies, deleteMovie, editMovie }) {
  const [editIndex, setEditIndex] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editGenre, setEditGenre] = useState("");
  const [editRating, setEditRating] = useState("");

  const handleEdit = (index, movie) => {
    setEditIndex(index);
    setEditTitle(movie.title);
    setEditGenre(movie.genre);
    setEditRating(movie.rating);
  };

  const saveEdit = (index) => {
    editMovie(index, { title: editTitle, genre: editGenre, rating: editRating });
    setEditIndex(null);
  };

  return (
    <div>
      <h3>📜 Movie List</h3>
      {movies.length === 0 ? (
        <p>No movies added yet.</p>
      ) : (
        <ul className="list-group">
          {movies.map((movie, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              {editIndex === index ? (
                <>
                  <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                  <input value={editGenre} onChange={(e) => setEditGenre(e.target.value)} />
                  <input value={editRating} onChange={(e) => setEditRating(e.target.value)} />
                  <button className="btn btn-success btn-sm" onClick={() => saveEdit(index)}>Save</button>
                </>
              ) : (
                <>
                  <span>
                    🎥 {movie.title} | {movie.genre} | ⭐ {movie.rating}
                  </span>
                  <div>
                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(index, movie)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => deleteMovie(index)}>Delete</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}