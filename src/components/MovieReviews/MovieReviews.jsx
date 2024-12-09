import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../api/tmdbApi";
import s from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      const reviewList = await fetchMovieReviews(movieId);
      setReviews(reviewList);
    };
    if (movieId) {
      getReviews();
    }
  }, [movieId]);

  return (
    <div className={s.reviews}>
      <h2 className={s.heading}>Reviews</h2>
      <ul className={s.list}>
        {reviews.map((review) => (
          <li key={review.id} className={s.item}>
            <p className={s.content}>{review.content}</p>
            <p className={s.author}>
              <b>{review.author}</b>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
