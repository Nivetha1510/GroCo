import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import './Cart.css';

export default function Cart() {
  const {
    items, total, removeFromCart, updateQuantity,
    coupon, applyCoupon, couponValid, discountPercent,
  } = useCart();
  const [code, setCode] = useState(coupon || '');
  const [applied, setApplied] = useState(Boolean(coupon));
  const navigate = useNavigate();

  const onApply = () => {
    if (!code.trim()) return;
    applyCoupon(code.trim());
    setApplied(true);
  };

  return (
    <div className="cart">
      <div className="cart__inner">
        <h1 className="cart__title">+ Cart</h1>

        {items.length === 0 ? (
          <p className="cart__empty">Your cart is empty.</p>
        ) : (
          <ul className="cart__list">
            {items.map((item) => (
              <li className="cart__row" key={item.id}>
                <div className="cart__thumb">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart__meta">
                  <h3 className="cart__name">{item.name}</h3>
                  <p className="cart__price">${item.price.toFixed(3)}</p>
                </div>
                <div className="cart__stepper">
                  <button
                    type="button"
                    className="cart__step-btn"
                    aria-label={`Decrease quantity of ${item.name}`}
                    onClick={() => updateQuantity(item.id, item.qty - 1)}
                  >
                    &minus;
                  </button>
                  <span className="cart__qty">{item.qty}</span>
                  <button
                    type="button"
                    className="cart__step-btn"
                    aria-label={`Increase quantity of ${item.name}`}
                    onClick={() => updateQuantity(item.id, item.qty + 1)}
                  >
                    &#43;
                  </button>
                </div>
                <button
                  type="button"
                  className="cart__delete"
                  aria-label={`Remove ${item.name}`}
                  onClick={() => removeFromCart(item.id)}
                >
                  <FaRegTrashAlt />
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="cart__totals">
          <div className="cart__total">
            <span className="cart__total-label">Total</span>
            <span className="cart__total-colon">:</span>
            <span className="cart__total-value">${total.toFixed(3)}</span>
          </div>
          <button
            type="button"
            className="cart__checkout"
            disabled={items.length === 0}
            onClick={() => navigate('/checkout')}
          >
            Checkout
          </button>
        </div>

        <div className="cart__coupon">
          <input
            className="cart__coupon-input"
            type="text"
            placeholder="Coupon Code"
            maxLength={6}
            value={code}
            onChange={(e) => {
              setCode(e.target.value.slice(0, 6));
              setApplied(false);
            }}
          />
          <button type="button" className="cart__coupon-btn" onClick={onApply}>
            Apply Coupon
          </button>
          {applied && (
            <span className={couponValid ? 'cart__applied' : 'cart__invalid'}>
              {couponValid ? `Applied (${Math.round(discountPercent * 100)}% off)` : 'Invalid code'}
            </span>
          )}
        </div>

        <button
          type="button"
          className="cart__back"
          onClick={() => navigate('/categories')}
        >
          <span aria-hidden="true">&#8592;</span>Back To Shopping
        </button>
      </div>
    </div>
  );
}
