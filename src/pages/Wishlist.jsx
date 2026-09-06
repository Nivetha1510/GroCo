import { Link } from 'react-router-dom';
import BuyNowCard from '../components/BuyNowCard';
import { useFavorites } from '../context/FavoritesContext';
import { getCategoryProductById } from '../data/categoryProducts';
import './Wishlist.css';

export default function Wishlist() {
  const { ids } = useFavorites();
  const products = ids.map(getCategoryProductById).filter(Boolean);

  return (
    <div className="wishlist">
      <h1 className="wishlist__title">My Wishlist</h1>

      {products.length === 0 ? (
        <div className="wishlist__empty">
          <p>You haven&rsquo;t added anything to your wishlist yet.</p>
          <Link to="/categories" className="btn-outline">Browse Categories</Link>
        </div>
      ) : (
        <div className="wishlist__grid">
          {products.map((p) => (
            <BuyNowCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
