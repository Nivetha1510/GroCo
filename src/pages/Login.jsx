import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import PasswordInput from '../components/PasswordInput';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const submit = () => {
    const next = {};
    if (!email.trim()) next.email = 'Email-Id is required';
    else if (!/^\S+@\S+\.\S+$/.test(email.trim())) next.email = 'Enter a valid email address';
    if (!password) next.password = 'Password is required';
    else if (password.length < 6) next.password = 'Password must be at least 6 characters';

    setErrors(next);
    if (Object.keys(next).length) return;

    const result = login(email.trim(), password);
    if (!result.success) {
      setErrors({ form: result.error });
      return;
    }

    const { from, buyNowProduct, buyNowQty, buyNowUnit } = location.state || {};
    if (buyNowProduct) {
      addToCart(buyNowProduct, buyNowQty || 1, buyNowUnit || 'kg');
      navigate('/cart');
    } else {
      navigate(from || '/');
    }
  };

  return (
    <div className="auth">
      <h1 className="auth__title">Log In Now</h1>

      <div className="auth__card">
        <div className="auth__avatar">
          <FaUser />
        </div>

        <label className="auth__label" htmlFor="login-email">Email-Id</label>
        <input
          id="login-email"
          className="auth__input"
          type="email"
          placeholder="Enter Your Mail-id"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <span className="field-error">{errors.email}</span>}

        <label className="auth__label" htmlFor="login-password">Password</label>
        <div className="auth__password-wrap">
          <PasswordInput
            id="login-password"
            className="auth__input"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
          />
        </div>
        {errors.password && <span className="field-error">{errors.password}</span>}
        {errors.form && <span className="field-error">{errors.form}</span>}

        <p className="auth__foot" style={{ margin: '0 0 8px', textAlign: 'right' }}>
          <Link to="/forgot-password" className="auth__link">Forgot Password?</Link>
        </p>

        <button type="button" className="auth__submit" onClick={submit}>
          Log In
        </button>

        <p className="auth__foot">
          Don’t Have An Account{' '}
          <Link to="/register" className="auth__link">Create Now?</Link>
        </p>
      </div>
    </div>
  );
}
