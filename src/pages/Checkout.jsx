import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdCreditCard, MdPhoneAndroid, MdAccountBalance } from 'react-icons/md';
import StepProgress from '../components/StepProgress';
import { useCart } from '../context/CartContext';
import { useOrder } from '../context/OrderContext';
import { COUNTRIES, INDIA_STATES, INDIA_STATES_CITIES } from '../data/locations';
import { PROMO_CODES } from '../data/discounts';
import './Checkout.css';

const FIELDS = [
  { key: 'firstName', label: 'First Name',      half: true },
  { key: 'lastName',  label: 'Last Name',       half: true },
  { key: 'email',     label: 'Email Address' },
  { key: 'phone',     label: 'Phone Number' },
  { key: 'street',    label: 'Street Address' },
  { key: 'country',   label: 'Country' },
  { key: 'state',     label: 'State / Province', third: true },
  { key: 'city',      label: 'City',            third: true },
  { key: 'zip',       label: 'ZIP / Postal Code', third: true },
];

const OPTIONS = [
  { id: 'card',       label: 'Card',       Icon: MdCreditCard },
  { id: 'upi',        label: 'UPI',        Icon: MdPhoneAndroid },
  { id: 'netbanking', label: 'Netbanking', Icon: MdAccountBalance },
];

export default function Checkout() {
  const {
    items, subtotal, shipping, total,
    couponValid, discountPercent: couponDiscountPercent, discountAmount: couponDiscountAmount,
  } = useCart();
  const { shipping: form, setShipping } = useOrder();
  const [errors, setErrors] = useState({});
  const [promoApplied, setPromoApplied] = useState(false);
  const navigate = useNavigate();

  const promoDiscountPercent = promoApplied ? PROMO_CODES[form.promo?.toUpperCase()] || 0 : 0;
  const promoValid = promoDiscountPercent > 0;
  const promoDiscountAmount = total * promoDiscountPercent;
  const finalTotal = total - promoDiscountAmount;

  const set = (key) => (e) =>
    setShipping({ ...form, [key]: e.target.value });

  const setPhone = (e) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
    setShipping({ ...form, phone: digits });
  };

  const setZip = (e) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 6);
    setShipping({ ...form, zip: digits });
  };

  const setCountry = (e) =>
    setShipping({ ...form, country: e.target.value, state: '', city: '' });

  const setState = (e) =>
    setShipping({ ...form, state: e.target.value, city: '' });

  const isIndia = form.country === 'India';
  const indiaCities = INDIA_STATES_CITIES[form.state] || [];

  const validate = () => {
    const next = {};
    FIELDS.forEach((f) => {
      if (!String(form[f.key] || '').trim()) next[f.key] = 'Required';
    });
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      next.email = 'Enter a valid email address';
    }
    if (form.phone && !/^\d{10}$/.test(form.phone.trim())) {
      next.phone = 'Enter a valid 10-digit phone number';
    }
    if (form.zip && !/^\d{6}$/.test(form.zip.trim())) {
      next.zip = 'Enter a valid 6-digit postal code';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const proceed = () => {
    if (!items.length) return;
    if (validate()) navigate('/payment');
  };

  return (
    <div className="checkout">
      <h1 className="checkout__title">Check Out</h1>

      <div className="checkout__inner">
        <section className="checkout__form">
          <StepProgress current={1} />

          <h2 className="checkout__heading">Delivery Information</h2>

          <div className="checkout__grid">
            {FIELDS.map((f) => {
              let control;
              if (f.key === 'country') {
                control = (
                  <select
                    id={`co-${f.key}`}
                    className="checkout__input"
                    value={form.country || ''}
                    onChange={setCountry}
                  >
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                );
              } else if (f.key === 'state' && isIndia) {
                control = (
                  <select
                    id={`co-${f.key}`}
                    className="checkout__input"
                    value={form.state || ''}
                    onChange={setState}
                  >
                    <option value="">Select State</option>
                    {INDIA_STATES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                );
              } else if (f.key === 'city' && isIndia) {
                control = (
                  <select
                    id={`co-${f.key}`}
                    className="checkout__input"
                    value={form.city || ''}
                    onChange={set('city')}
                    disabled={!form.state}
                  >
                    <option value="">{form.state ? 'Select City' : 'Select state first'}</option>
                    {indiaCities.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                );
              } else {
                const onChange = f.key === 'phone' ? setPhone : f.key === 'zip' ? setZip : set(f.key);
                control = (
                  <input
                    id={`co-${f.key}`}
                    className="checkout__input"
                    type="text"
                    inputMode={f.key === 'phone' || f.key === 'zip' ? 'numeric' : undefined}
                    value={form[f.key] || ''}
                    onChange={onChange}
                  />
                );
              }

              return (
                <div
                  key={f.key}
                  className={`checkout__field ${f.half ? 'is-half' : ''} ${f.third ? 'is-third' : ''}`}
                >
                  <label className="checkout__label" htmlFor={`co-${f.key}`}>
                    {f.label}
                  </label>
                  {control}
                  {errors[f.key] && <span className="field-error">{errors[f.key]}</span>}
                </div>
              );
            })}
          </div>

          <h2 className="checkout__heading">Payment Options</h2>
          <div className="checkout__options">
            {OPTIONS.map(({ id, label, Icon }) => (
              <label className="checkout__option" key={id}>
                <input
                  type="radio"
                  name="paymentOption"
                  value={id}
                  checked={form.paymentOption === id}
                  onChange={set('paymentOption')}
                />
                <Icon className="checkout__option-icon" />
                <span>{label}</span>
              </label>
            ))}
          </div>

          <h2 className="checkout__heading">Promo Code</h2>
          <div className="checkout__promo">
            <input
              className="checkout__promo-input"
              type="text"
              placeholder="Enter promo code"
              maxLength={6}
              value={form.promo || ''}
              onChange={(e) => {
                setShipping({ ...form, promo: e.target.value.slice(0, 6) });
                setPromoApplied(false);
              }}
            />
            <button
              type="button"
              className="checkout__promo-btn"
              onClick={() => form.promo?.trim() && setPromoApplied(true)}
            >
              Apply
            </button>
            {promoApplied && (
              <span className={promoValid ? 'checkout__applied' : 'checkout__invalid'}>
                {promoValid ? `Applied (${Math.round(promoDiscountPercent * 100)}% off)` : 'Invalid code'}
              </span>
            )}
          </div>

          <div className="checkout__actions">
            <button
              type="button"
              className="btn-teal"
              disabled={!items.length}
              onClick={proceed}
            >
              Continue to Payment
            </button>
          </div>
        </section>

        <aside className="checkout__summary">
          <h2 className="checkout__summary-title">Order Summary</h2>

          {items.length === 0 ? (
            <p className="checkout__empty">Your card is empty.</p>
          ) : (
            <ul className="checkout__items">
              {items.map((item) => (
                <li className="checkout__item" key={item.id}>
                  <img src={item.image} alt="" />
                  <div className="checkout__item-meta">
                    <h3>{item.name}</h3>
                    <p>Quantity: {item.qty}</p>
                  </div>
                  <span className="checkout__item-price">
                    ${(item.price * item.qty).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <dl className="checkout__totals">
            <div><dt>Subtotal</dt><dd>${subtotal.toFixed(2)}</dd></div>
            <div><dt>Shipping</dt><dd>${shipping.toFixed(2)}</dd></div>
            {couponValid && (
              <div>
                <dt>Coupon ({Math.round(couponDiscountPercent * 100)}%)</dt>
                <dd>&minus;${couponDiscountAmount.toFixed(2)}</dd>
              </div>
            )}
            {promoValid && (
              <div>
                <dt>Promo ({Math.round(promoDiscountPercent * 100)}%)</dt>
                <dd>&minus;${promoDiscountAmount.toFixed(2)}</dd>
              </div>
            )}
            <div className="is-total"><dt>Total</dt><dd>${finalTotal.toFixed(2)}</dd></div>
          </dl>
        </aside>
      </div>
    </div>
  );
}
