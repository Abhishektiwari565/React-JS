import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddMovie from "./pages/AddMovie";
import EditMovie from "./pages/EditMovie";
import DetailsPage from "./pages/DetailsPage";
import moviesData from "./data/movies.json";

function App() {
  const [movies, setMovies] = useState(moviesData);

  return (
    <>
      <Navbar />
      <div className="container mt-4">

        <Routes>
          <Route path="/" element={<Home movies={movies} setMovies={setMovies} />} />
          <Route path="/add" element={<AddMovie setMovies={setMovies} />} />
          <Route path="/edit/:id" element={<EditMovie movies={movies} setMovies={setMovies} />} />
          <Route path="/movie/:id" element={<DetailsPage movies={movies} />} />
        </Routes>

      </div>
    </>
  );
}

export default App;
