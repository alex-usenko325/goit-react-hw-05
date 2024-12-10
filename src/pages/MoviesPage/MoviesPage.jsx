import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import { searchMovies } from "../../api/tmdbApi";
import { Circles } from "react-loader-spinner";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";
import s from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    const fetchMoviesByQuery = async () => {
      if (!query) return;
      setIsLoading(true);
      try {
        const fetchedMovies = await searchMovies(query);
        if (fetchedMovies.length === 0) {
          toast("No movies found for your query. Try something else!", {
            icon: <FaExclamationTriangle size={24} color="#f39c12" />,
          });
        }
        setMovies(fetchedMovies);
      } catch (error) {
        toast.error(`Error fetching movies: ${error.message}`, {
          icon: <FaExclamationTriangle size={24} color="#e74c3c" />,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchMoviesByQuery();
  }, [query]);

  const handleSearch = () => {
    const searchQuery = searchParams.get("query").trim();
    if (searchQuery) {
      setSearchParams({ query: searchQuery });
    } else {
      toast("Please enter a search term!", {
        icon: <FaInfoCircle size={24} color="#3498db" />,
      });
    }
  };

  const handleInputChange = (e) => {
    setSearchParams({ query: e.target.value });
  };

  return (
    <div className={s.container}>
      <div className={s.form}>
        <div className={s.inputWrapper}>
          <span className={s.icon} onClick={handleSearch}>
            <FaSearch />
          </span>

          <input
            type="text"
            name="query"
            value={query}
            onChange={handleInputChange}
            placeholder="Search movies..."
            className={s.input}
          />
        </div>
      </div>
      {isLoading && (
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
      )}
      {!isLoading && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
