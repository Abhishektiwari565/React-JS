import React, { useState, useEffect } from "react";
import MovieForm from "./components/MovieForm";
import MovieList from "./components/MovieList";
import UserSession from "./components/UserSession";
import "./App.css";

export default function App() {
  const [movies, setMovies] = useState([]);

  
  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem("movies")) || [];
    setMovies(savedMovies);
  }, []);

 
  useEffect(() => {
    localStorage.setItem("movies", JSON.stringify(movies));
  }, [movies]);

 
  const addMovie = (movie) => {
    setMovies([...movies, movie]);
  };


  const deleteMovie = (index) => {
    const updated = movies.filter((_, i) => i !== index);
    setMovies(updated);
  };

 
  const editMovie = (index, updatedMovie) => {
    const updated = [...movies];
    updated[index] = updatedMovie;
    setMovies(updated);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-3">🎬 Favorite Movies Manager</h1>
      <UserSession />
      <MovieForm addMovie={addMovie} />
      <MovieList movies={movies} deleteMovie={deleteMovie} editMovie={editMovie} />
    </div>
  );
}