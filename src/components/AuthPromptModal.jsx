import { useNavigate, useLocation } from 'react-router-dom';
import './AuthPromptModal.css';

export default function AuthPromptModal({
  open, onClose, product, qty = 1, unit = 'kg', redirectTo,
  message = 'Please sign in or create an account to buy this item.',
}) {
  const navigate = useNavigate();
  const location = useLocation();

  if (!open) return null;

  const goTo = (path) => {
    navigate(path, {
      state: {
        from: redirectTo || location.pathname,
        buyNowProduct: product,
        buyNowQty: qty,
        buyNowUnit: unit,
      },
    });
  };

  return (
    <div className="auth-prompt__overlay" onClick={onClose}>
      <div className="auth-prompt" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="auth-prompt__close"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="auth-prompt__title">Sign In To Continue</h2>
        <p className="auth-prompt__text">{message}</p>
        <div className="auth-prompt__actions">
          <button
            type="button"
            className="btn-accent auth-prompt__btn auth-prompt__signin"
            onClick={() => goTo('/login')}
          >
            Sign In
          </button>
          <button
            type="button"
            className="btn-outline auth-prompt__btn"
            onClick={() => goTo('/register')}
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}
