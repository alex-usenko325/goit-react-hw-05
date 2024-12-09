import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../api/tmdbApi";

import MovieList from "../../components/MovieList/MovieList";

import { toast } from "react-hot-toast";
import { GoSearch } from "react-icons/go";
import { Circles } from "react-loader-spinner";
import s from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const queryParam = searchParams.get("query");
    if (queryParam) {
      setQuery(queryParam);
    }
  }, [searchParams]);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!query) {
      toast.error("Please enter a movie name to search!");
      return;
    }

    setLoading(true);
    try {
      const searchedMovies = await searchMovies(query);
      if (searchedMovies.length === 0) {
        toast.error("No movies found for your search.");
      } else {
        setMovies(searchedMovies);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
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
      {loading ? (
        <div className="loader">
          <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            visible={true}
          />
          <p>Loading...</p>
        </div>
      ) : (
        <MovieList movies={movies} />
      )}
    </div>
  );
};

export default MoviesPage;
