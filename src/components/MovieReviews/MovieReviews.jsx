import { useState, useEffect } from "react";
import { fetchMovieReviews } from "../../api/tmdbApi";
import s from "./MovieReviews.module.css";

const MovieReviews = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      const reviewList = await fetchMovieReviews(movieId);
      setReviews(reviewList);
    };
    getReviews();
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
