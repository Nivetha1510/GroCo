import { useEffect, useRef, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { MdOutlineShoppingCart, MdStorefront } from 'react-icons/md';
import { FaUser, FaHeart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import SearchBar from './SearchBar';
import './Header.css';

const NAV = [
  { to: '/',           label: 'Home', end: true },
  { to: '/about',      label: 'About Us' },
  { to: '/categories', label: 'Categories' },
  { to: '/contact',    label: 'Contact' },
];

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const { count } = useCart();
  const { user, logout } = useAuth();
  const { ids: favoriteIds } = useFavorites();
  const navigate = useNavigate();
  const accountRef = useRef(null);

  const submitSearch = (term) => {
    setSearchOpen(false);
    navigate(`/search?q=${encodeURIComponent(term)}`);
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
        <div className="header__search">
          <div className="header__search-inner">
            <SearchBar autoFocus onSubmit={submitSearch} />
          </div>
        </div>
      )}
    </header>
  );
}
