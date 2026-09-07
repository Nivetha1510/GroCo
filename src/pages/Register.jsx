import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import PasswordInput from '../components/PasswordInput';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Auth.css';

/* No Register frame exists in the supplied prototype. Built as a
   minimal mirror of the Log In frame so "Create Now?" has a target. */
export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState({});
  const { register } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const submit = () => {
    const next = {};
    if (!email.trim()) next.email = 'Email-Id is required';
    else if (!/^\S+@\S+\.\S+$/.test(email.trim())) next.email = 'Enter a valid email address';
    if (!password) next.password = 'Password is required';
    else if (password.length < 6) next.password = 'Password must be at least 6 characters';
    if (confirm !== password) next.confirm = 'Passwords do not match';

    setErrors(next);
    if (Object.keys(next).length) return;

    const result = register(email.trim(), password);
    if (!result.success) {
      setErrors({ email: result.error });
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
      <h1 className="auth__title">Create Account</h1>

      <div className="auth__card">
        <div className="auth__avatar"><FaUser /></div>

        <label className="auth__label" htmlFor="reg-email">Email-Id</label>
        <input
          id="reg-email"
          className="auth__input"
          type="email"
          placeholder="Enter Your Mail-id"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <span className="field-error">{errors.email}</span>}

        <label className="auth__label" htmlFor="reg-password">Password</label>
        <div className="auth__password-wrap">
          <PasswordInput
            id="reg-password"
            className="auth__input"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errors.password && <span className="field-error">{errors.password}</span>}

        <label className="auth__label" htmlFor="reg-confirm">Confirm Password</label>
        <div className="auth__password-wrap">
          <PasswordInput
            id="reg-confirm"
            className="auth__input"
            placeholder="Re-enter Your Password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && submit()}
          />
        </div>
        {errors.confirm && <span className="field-error">{errors.confirm}</span>}

        <button type="button" className="auth__submit" onClick={submit}>
          Create Now
        </button>

        <p className="auth__foot">
          Already Have An Account <Link to="/login" className="auth__link">Log In?</Link>
        </p>
      </div>
    </div>
  );
}
