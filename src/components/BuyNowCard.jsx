import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import AuthPromptModal from './AuthPromptModal';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';
import './BuyNowCard.css';

/* Card used in the category grids (frames 34, 43, 45–48). */
export default function BuyNowCard({ product }) {
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [qty, setQty] = useState(1);

  const buyNow = () => {
    if (!user) {
      setShowAuthPrompt(true);
      return;
    }
    addToCart(product, qty);
    navigate('/cart');
  };

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

      <p className="buy-card__price">${product.price}</p>

      <div className="buy-card__meta">
        <h3 className="buy-card__name">{product.name}</h3>
        <p className="buy-card__sub">{product.subtitle}</p>
      </div>

      <div className="buy-card__row">
        <div className="buy-card__stepper">
          <button
            type="button"
            className="buy-card__step-btn"
            aria-label="Decrease quantity"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
          >
            &minus;
          </button>
          <span className="buy-card__qty">{qty}</span>
          <button
            type="button"
            className="buy-card__step-btn"
            aria-label="Increase quantity"
            onClick={() => setQty((q) => q + 1)}
          >
            &#43;
          </button>
        </div>
        <button type="button" className="btn-accent buy-card__btn" onClick={buyNow}>
          Buy Now
        </button>
      </div>

      <AuthPromptModal
        open={showAuthPrompt}
        onClose={() => setShowAuthPrompt(false)}
        product={product}
        qty={qty}
      />
    </article>
  );
}
