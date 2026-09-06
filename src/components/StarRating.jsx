import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import './StarRating.css';

export default function StarRating({ value = 4.5, size = 20 }) {
  const stars = [];
  for (let i = 1; i <= 5; i += 1) {
    if (value >= i) stars.push(<FaStar key={i} />);
    else if (value >= i - 0.5) stars.push(<FaStarHalfAlt key={i} />);
    else stars.push(<FaRegStar key={i} />);
  }
  return (
    <span className="stars" style={{ fontSize: size }} aria-label={`${value} out of 5`}>
      {stars}
    </span>
  );
}
