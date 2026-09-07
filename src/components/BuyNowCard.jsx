import { Link, useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useFavorites } from '../context/FavoritesContext';
import './BuyNowCard.css';

/* Card used in the category grids (frames 34, 43, 45–48).
   Buy Now just opens the product page — quantity, unit, and
   Add to Cart live there (ProductDetail.jsx). */
export default function BuyNowCard({ product }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const navigate = useNavigate();

  return (
    <article className="buy-card">
      <button
        type="button"
        className={`buy-card__heart ${isFavorite(product.id) ? 'is-on' : ''}`}
        aria-label="Toggle favourite"
        aria-pressed={isFavorite(product.id)}
        onClick={() => toggleFavorite(product.id)}
      >
        {isFavorite(product.id) ? <FaHeart /> : <FaRegHeart />}
      </button>

      <Link to={`/product/${product.id}`} className="buy-card__media">
        <img src={product.image} alt={product.name} />
      </Link>

      <p className="buy-card__price">₹{product.price}</p>

      <div className="buy-card__row">
        <div className="buy-card__meta">
          <h3 className="buy-card__name">{product.name}</h3>
          <p className="buy-card__sub">{product.subtitle}</p>
        </div>
        <button
          type="button"
          className="buy-card__btn"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          Buy Now
        </button>
      </div>
    </article>
  );
}
