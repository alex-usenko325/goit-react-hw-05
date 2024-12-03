import { useEffect, useState, Suspense, lazy } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { fetchMovieDetails } from "../../api/tmdbApi";
import s from "./MovieDetailsPage.module.css";

const MovieCast = lazy(() => import("../../components/MovieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("../../components/MovieReviews/MovieReviews")
);

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [showCast, setShowCast] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const getMovieDetails = async () => {
      const details = await fetchMovieDetails(movieId);
      setMovie(details);
    };
    getMovieDetails();
  }, [movieId]);

  if (!movie) return <p>Loading...</p>;

  const goBackLink = location.state?.from || "/movies";

  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";
  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : "N/A";
  const country =
    movie.production_countries && movie.production_countries.length > 0
      ? movie.production_countries[0].name
      : "N/A";

  return (
    <div className={s.container}>
      <Link to={goBackLink} className={s.goBack}>
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
            <button onClick={() => setShowCast((prev) => !prev)}>
              {showCast ? "Hide Cast" : "Show Cast"}
            </button>
            <button onClick={() => setShowReviews((prev) => !prev)}>
              {showReviews ? "Hide Reviews" : "Show Reviews"}
            </button>
          </div>
        </div>
      </div>
      {showCast && (
        <Suspense fallback={<p>Loading cast...</p>}>
          <MovieCast movieId={movieId} />
        </Suspense>
      )}
      {showReviews && (
        <Suspense fallback={<p>Loading reviews...</p>}>
          <MovieReviews movieId={movieId} />
        </Suspense>
      )}
    </div>
  );
};

export default MovieDetailsPage;