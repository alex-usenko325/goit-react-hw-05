import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../api/tmdbApi";
import s from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const getCast = async () => {
      const castList = await fetchMovieCast(movieId);
      setCast(castList);
    };
    if (movieId) {
      getCast();
    }
  }, [movieId]);

  return (
    <div className={s.cast}>
      <h2 className={s.heading}>Cast</h2>
      <ul className={s.list}>
        {cast.map((actor) => (
          <li key={actor.id} className={s.item}>
            <div className={s.actor}>
              {actor.profile_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                  alt={actor.name}
                  className={s.actorImage}
                />
              )}
              <div className={s.actorDetails}>
                <p className={s.actorName}>{actor.name}</p>
                <p className={s.actorCharacter}>Character: {actor.character}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
