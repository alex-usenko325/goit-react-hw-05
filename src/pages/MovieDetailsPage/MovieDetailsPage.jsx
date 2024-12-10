import { useEffect, useState, useRef } from "react";
import {
  useParams,
  Link,
  NavLink,
  Outlet,
  useLocation,
} from "react-router-dom";
import { fetchMovieDetails } from "../../api/tmdbApi";
import { Circles } from "react-loader-spinner";
import s from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();

  const goBackLink = useRef(location.state?.from || "/movies");

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const details = await fetchMovieDetails(movieId);
        setMovie(details);
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
        setError("Something went wrong while fetching the movie details.");
      }
    };

    getMovieDetails();
  }, [movieId]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!movie)
    return (
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
    );

  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";
  const country = movie.production_countries?.[0]?.name || "N/A";

  return (
    <div className={s.container}>
      <Link to={goBackLink.current} className={s.goBack}>
        Go back
      </Link>
      <div className={s.movieDetails}>
        <div className={s.posterWrapper}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className={s.poster}
          />
        </div>
        <div className={s.details}>
          <h1 className={s.title}>{movie.title}</h1>
          <ul className={s.info}>
            <li>
              <p className={s.overview}>{movie.overview}</p>
            </li>
            <li>
              <p>
                <strong>Rating:</strong> {rating}
              </p>
            </li>
            <li>
              <p>
                <strong>Release Year:</strong> {releaseYear}
              </p>
            </li>
            <li>
              <p>
                <strong>Country:</strong> {country}
              </p>
            </li>
          </ul>

          <div className={s.buttons}>
            <NavLink
              to="cast"
              className={({ isActive }) =>
                isActive ? s.activeButton : s.button
              }
            >
              Cast
            </NavLink>
            <NavLink
              to="reviews"
              className={({ isActive }) =>
                isActive ? s.activeButton : s.button
              }
            >
              Reviews
            </NavLink>
          </div>
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
