import StarRating from './StarRating';
import './ReviewCard.css';

export default function ReviewCard({ review }) {
  return (
    <article className="review-card">
      <img className="review-card__avatar" src={review.avatar} alt={review.name} />
      <p className="review-card__text">{review.text}</p>
      <h4 className="review-card__name">{review.name}</h4>
      <StarRating value={review.rating} size={16} />
    </article>
  );
}
