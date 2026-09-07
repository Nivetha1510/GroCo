import { Link, useNavigate } from 'react-router-dom';
import StarRating from './StarRating';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

/* Card used in "Our products" and in search results (frames 04–16). */
export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(product);
    navigate('/cart');
  };

  return (
    <article className="product-card">
      <div className="product-card__inner">
        <Link to={`/product/${product.id}`} className="product-card__media">
          <img src={product.image} alt={product.name} />
        </Link>
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__price">₹{product.price}/kg</p>
        <StarRating value={product.rating} size={22} />
        <button
          type="button"
          className="btn-outline product-card__btn"
          onClick={handleAddToCart}
        >
          Add to card
        </button>
      </div>
    </article>
  );
}
