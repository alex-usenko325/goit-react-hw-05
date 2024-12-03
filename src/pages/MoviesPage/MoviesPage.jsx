import { useState } from "react";
import { searchMovies } from "../../api/tmdbApi";
import MovieList from "../../components/MovieList/MovieList";
import { toast } from "react-hot-toast";
import { GoSearch } from "react-icons/go";
import s from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!query) {
      toast.error("Please enter a movie name to search!");
      return;
    }

    const searchedMovies = await searchMovies(query);
    if (searchedMovies.length === 0) {
      toast.error("No movies found for your search.");
    } else {
      setMovies(searchedMovies);
    }
  };

  const handleIconClick = () => {
    if (!query) {
      toast.error("Please enter a movie name to search!");
      return;
    }

    handleSearch();
  };

  return (
    <div className={s.container}>
      <h1>Search Movies</h1>
      <form onSubmit={handleSearch}>
        <div className={s.inputWrapper}>
          <input
            type="text"
            value={query}
            autoFocus
            autoComplete="off"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search images and photos"
            className={s.input}
          />
          <GoSearch className={s.icon} size={24} onClick={handleIconClick} />
        </div>
      </form>
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
