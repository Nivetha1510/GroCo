import { useEffect, useMemo, useRef, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { MdOutlineShoppingCart, MdStorefront } from 'react-icons/md';
import { FaUser, FaHeart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { products } from '../data/products';
import { allCategoryProducts } from '../data/categoryProducts';
import SearchBar from './SearchBar';
import './Header.css';

const NAV = [
  { to: '/',           label: 'Home', end: true },
  { to: '/about',      label: 'About Us' },
  { to: '/categories', label: 'Categories' },
  { to: '/contact',    label: 'Contact' },
];

const MAX_SUGGESTIONS = 6;
const SEARCH_POOL = [...products, ...allCategoryProducts];

const findSuggestions = (term) => {
  const q = term.trim().toLowerCase();
  if (!q) return [];
  const seen = new Set();
  const matches = [];
  for (const p of SEARCH_POOL) {
    const key = p.cartName || p.name;
    if (seen.has(key)) continue;
    if (p.name.toLowerCase().includes(q) || (p.cartName || '').toLowerCase().includes(q)) {
      seen.add(key);
      matches.push(p);
      if (matches.length >= MAX_SUGGESTIONS) break;
    }
  }
  return matches;
};

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const { count } = useCart();
  const { user, logout } = useAuth();
  const { ids: favoriteIds } = useFavorites();
  const navigate = useNavigate();
  const accountRef = useRef(null);
  const searchRef = useRef(null);
  const searchToggleRef = useRef(null);

  const suggestions = useMemo(() => findSuggestions(searchTerm), [searchTerm]);

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchTerm('');
  };

  const submitSearch = (term) => {
    closeSearch();
    navigate(`/search?q=${encodeURIComponent(term)}`);
  };

  const goToSuggestion = (id) => {
    closeSearch();
    navigate(`/product/${id}`);
  };

  const handleLogout = () => {
    logout();
    setAccountOpen(false);
    navigate('/');
  };

  useEffect(() => {
    if (!accountOpen) return undefined;
    const onClickOutside = (e) => {
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [accountOpen]);

  useEffect(() => {
    if (!searchOpen) return undefined;
    const onClickOutside = (e) => {
      if (
        searchRef.current && !searchRef.current.contains(e.target) &&
        searchToggleRef.current && !searchToggleRef.current.contains(e.target)
      ) {
        closeSearch();
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, [searchOpen]);

  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="header__brand">
          <MdStorefront className="header__brand-icon" />
          <span>GroCo</span>
        </Link>

        <button
          className="header__burger"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>

        <nav className={`header__nav ${menuOpen ? 'is-open' : ''}`}>
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `header__link ${isActive ? 'is-active' : ''}`
              }
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header__actions">
          <button
            ref={searchToggleRef}
            className="header__icon"
            aria-label="Search"
            onClick={() => setSearchOpen((v) => !v)}
          >
            <FiSearch />
          </button>

          <Link to="/wishlist" className="header__icon" aria-label="Wishlist">
            <FaHeart />
            {favoriteIds.length > 0 && <span className="header__badge">{favoriteIds.length}</span>}
          </Link>

          <Link to="/cart" className="header__icon" aria-label="Cart">
            <MdOutlineShoppingCart />
            {count > 0 && <span className="header__badge">{count}</span>}
          </Link>

          {user ? (
            <div className="header__account" ref={accountRef}>
              <button
                type="button"
                className="header__icon"
                aria-label="Account"
                aria-expanded={accountOpen}
                onClick={() => setAccountOpen((v) => !v)}
              >
                <FaUser />
              </button>
              {accountOpen && (
                <div className="header__account-menu">
                  <p className="header__account-email">{user.email}</p>
                  <button
                    type="button"
                    className="header__account-logout"
                    onClick={handleLogout}
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="header__icon" aria-label="Account">
              <FaUser />
            </Link>
          )}
        </div>
      </div>

      {searchOpen && (
        <div className="header__search" ref={searchRef}>
          <div className="header__search-inner">
            <SearchBar
              autoFocus
              value={searchTerm}
              onChange={setSearchTerm}
              onSubmit={submitSearch}
            />

            {suggestions.length > 0 && (
              <ul className="header__suggestions">
                {suggestions.map((p) => (
                  <li key={p.id}>
                    <button
                      type="button"
                      className="header__suggestion"
                      onClick={() => goToSuggestion(p.id)}
                    >
                      <img src={p.image} alt="" />
                      <span className="header__suggestion-name">{p.cartName || p.name}</span>
                      <span className="header__suggestion-price">
                        ₹{p.price}/{p.unitType === 'volume' ? 'L' : 'kg'}
                      </span>
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    className="header__suggestion header__suggestion-all"
                    onClick={() => submitSearch(searchTerm)}
                  >
                    See all results for &ldquo;{searchTerm.trim()}&rdquo;
                  </button>
                </li>
              </ul>
            )}

            {suggestions.length === 0 && searchTerm.trim() && (
              <p className="header__no-suggestions">No products match &ldquo;{searchTerm.trim()}&rdquo;.</p>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
