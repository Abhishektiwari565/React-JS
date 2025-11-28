import movies from "./data/movies.json";

export const getAllMovies = () => {
  return movies;
};

export const searchMovies = (query) => {
  return movies.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );
};

export const getMovieDetails = (id) => {
  return movies.find((movie) => movie.id === id);
};
