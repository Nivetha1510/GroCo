import { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { FaStar } from 'react-icons/fa';
import StarRating from '../components/StarRating';
import AuthPromptModal from '../components/AuthPromptModal';
import UnitToggle from '../components/UnitToggle';
import { useCart, UNIT_STEP, UNIT_MIN, DEFAULT_QTY, UNIT_PAIRS } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { getCategoryProductById } from '../data/categoryProducts';
import { getProductById } from '../data/products';
import { getProductDetailsText } from '../data/content';
import './ProductDetail.css';

const REVIEWERS = ['Priya Sharma', 'Arjun Mehta'];

/* Frames 55–60. Every variant carries the same copy in the design. */
export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const catalogItem = getProductById(id);
  const gridItem = getCategoryProductById(id);
  const product = gridItem || catalogItem;
  const unitPair = UNIT_PAIRS[product?.unitType || 'weight'];
  const bigUnit = unitPair[1];

  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [unit, setUnit] = useState(bigUnit);
  const [qty, setQty] = useState(DEFAULT_QTY[bigUnit]);

  const changeUnit = (nextUnit) => {
    setUnit(nextUnit);
    setQty(DEFAULT_QTY[nextUnit]);
  };

  if (!product) {
    return (
      <div className="container pd__missing">
        <h1 className="page-title">Product not found</h1>
        <p>
          <Link to="/categories" className="pd__link">Back to Categories</Link>
        </p>
      </div>
    );
  }

  const title = gridItem ? gridItem.name : catalogItem.name;
  const subtitle = gridItem ? gridItem.subtitle : catalogItem.cartName;
  const price = gridItem ? gridItem.price : catalogItem.price;
  const reviewLine = gridItem?.review || 'The product was so fresh Its receive perfectly';

  const buyNow = () => {
    if (!user) {
      setShowAuthPrompt(true);
      return;
    }
    addToCart(product, qty, unit);
    navigate('/cart');
  };

  return (
    <div className="pd">
      <div className="pd__top">
        <div className="pd__media">
          <img src={product.image} alt={title} />
        </div>

        <div className="pd__info">
          <h1 className="pd__title">{title}</h1>
          <p className="pd__subtitle">{subtitle}</p>
          <p className="pd__price">₹{price}/{bigUnit}</p>

          <div className="pd__stepper">
            <button
              type="button"
              className="pd__step-btn"
              aria-label="Decrease quantity"
              onClick={() => setQty((q) => Math.max(UNIT_MIN[unit], q - UNIT_STEP[unit]))}
            >
              &minus;
            </button>
            <span className="pd__qty">{qty} {unit}</span>
            <button
              type="button"
              className="pd__step-btn"
              aria-label="Increase quantity"
              onClick={() => setQty((q) => q + UNIT_STEP[unit])}
            >
              &#43;
            </button>
            <UnitToggle unit={unit} units={unitPair} onChange={changeUnit} />
          </div>

          <div className="pd__actions">
            <button
              type="button"
              className="pd__add"
              onClick={() => addToCart(product, qty, unit)}
            >
              <MdOutlineShoppingCart />
              <span>Add to Cart</span>
            </button>
            <button type="button" className="btn-accent pd__buy" onClick={buyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="pd__rating">
        4 <FaStar />
      </div>

      <section className="pd__block">
        <h2 className="pd__heading">Product Details</h2>
        <p className="pd__details">{getProductDetailsText(title)}</p>
      </section>

      <section className="pd__block">
        <h2 className="pd__heading">Review</h2>
        {REVIEWERS.map((reviewer, i) => (
          <div className="pd__review" key={i}>
            <span className="pd__avatar" />
            <div className="pd__review-body">
              <h4 className="pd__reviewer">{reviewer}</h4>
              <p className="pd__review-text">{reviewLine}</p>
              <StarRating value={4} size={18} />
            </div>
          </div>
        ))}
      </section>

      <AuthPromptModal
        open={showAuthPrompt}
        onClose={() => setShowAuthPrompt(false)}
        product={product}
        qty={qty}
        unit={unit}
      />
    </div>
  );
}
