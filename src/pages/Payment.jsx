import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import QRCode from 'qrcode';
import { MdQrCode2, MdAccountBalance, MdLock } from 'react-icons/md';
import StepProgress from '../components/StepProgress';
import BackButton from '../components/BackButton';
import { useCart } from '../context/CartContext';
import { useOrder } from '../context/OrderContext';
import { BANKS } from '../data/banks';
import { PROMO_CODES } from '../data/discounts';
import './Payment.css';

const groupCard = (v) =>
  v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1  ').trim();

export default function Payment() {
  const {
    items, subtotal, shipping, total, clearCart,
    couponValid, discountPercent: couponDiscountPercent, discountAmount: couponDiscountAmount,
  } = useCart();
  const { shipping: address, placeOrder, clearShipping } = useOrder();
  const navigate = useNavigate();
  const paymentMethod = address.paymentOption || 'card';

  const promoDiscountPercent = PROMO_CODES[address.promo?.toUpperCase()] || 0;
  const promoValid = promoDiscountPercent > 0;
  const promoDiscountAmount = total * promoDiscountPercent;
  const finalTotal = total - promoDiscountAmount;

  const [card, setCard] = useState({ holder: '', number: '', expiry: '', cvv: '' });
  const [upiMode, setUpiMode] = useState('id');
  const [upiId, setUpiId] = useState('');
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [bank, setBank] = useState('');
  const [nbStep, setNbStep] = useState('select');
  const [bankLogin, setBankLogin] = useState({ userId: '', password: '' });
  const [errors, setErrors] = useState({});

  const set = (key, transform) => (e) => {
    const value = transform ? transform(e.target.value) : e.target.value;
    setCard((c) => ({ ...c, [key]: value }));
  };

  useEffect(() => {
    if (paymentMethod !== 'upi' || upiMode !== 'qr') return undefined;
    let cancelled = false;
    const payload = `upi://pay?pa=groco.store@upi&pn=GroCo&am=${finalTotal.toFixed(2)}&cu=INR`;
    QRCode.toDataURL(payload, { width: 220, margin: 1 })
      .then((url) => { if (!cancelled) setQrDataUrl(url); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [paymentMethod, upiMode, finalTotal]);

  const completeOrder = (extra) => {
    placeOrder({
      items,
      subtotal,
      shipping,
      couponValid,
      couponDiscountPercent,
      couponDiscountAmount,
      promoValid,
      promoDiscountPercent,
      promoDiscountAmount,
      total: finalTotal,
      address,
      paymentMethod,
      placedAt: new Date().toISOString(),
      ...extra,
    });
    clearCart();
    clearShipping();
    navigate('/confirmation');
  };

  const payCard = () => {
    const next = {};
    if (!card.holder.trim()) next.holder = 'Card holder name is required';
    if (card.number.replace(/\s/g, '').length !== 16) next.number = 'Enter a 16-digit card number';
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(card.expiry)) {
      next.expiry = 'Use MM/YY';
    } else {
      const [mm, yy] = card.expiry.split('/').map(Number);
      const now = new Date();
      const currentYY = now.getFullYear() % 100;
      const currentMM = now.getMonth() + 1;
      if (yy < currentYY || (yy === currentYY && mm < currentMM)) {
        next.expiry = 'Card has expired';
      }
    }
    if (!/^\d{3,4}$/.test(card.cvv)) next.cvv = 'Enter a 3 or 4 digit CVV';
    setErrors(next);
    if (!items.length || Object.keys(next).length) return;

    completeOrder({
      cardHolder: card.holder,
      cardLast4: card.number.replace(/\s/g, '').slice(-4),
    });
  };

  const payUpiById = () => {
    const next = {};
    if (!upiId.trim()) next.upiId = 'UPI ID is required';
    else if (!/^[\w.-]{2,256}@[a-zA-Z]{2,64}$/.test(upiId.trim())) {
      next.upiId = 'Enter a valid UPI ID (e.g. name@bank)';
    }
    setErrors(next);
    if (!items.length || Object.keys(next).length) return;

    completeOrder({ upiId: upiId.trim() });
  };

  const payUpiByQr = () => {
    if (!items.length) return;
    completeOrder({ upiId: 'Paid via QR scan' });
  };

  const proceedToBank = () => {
    if (!bank) {
      setErrors({ bank: 'Please select your bank' });
      return;
    }
    setErrors({});
    setNbStep('login');
  };

  const payNetbanking = () => {
    const next = {};
    if (!bankLogin.userId.trim()) next.userId = 'User ID is required';
    if (!bankLogin.password) next.password = 'Password is required';
    else if (bankLogin.password.length <= 6) next.password = 'Password must be more than 6 characters';
    setErrors(next);
    if (!items.length || Object.keys(next).length) return;

    completeOrder({ bank });
  };

  return (
    <div className="payment">
      <div className="payment__steps">
        <StepProgress current={2} />
      </div>

      <div className="payment__panel">
        <h1 className="payment__title">Payment details</h1>

        <div className="payment__body">
          <div className="payment__left">
            {paymentMethod === 'card' && (
              <div className="payment__card">
                <span className="payment__chip" />
                <span className="payment__brand" />
                <p className="payment__card-number">
                  {card.number || '9047  9485  2593  6046'}
                </p>
                <div className="payment__card-foot">
                  <div>
                    <span>Name</span>
                    <strong>{card.holder || 'GAYATHIRIS'}</strong>
                  </div>
                  <div>
                    <span>Exp</span>
                    <strong>{card.expiry || '12/29'}</strong>
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === 'upi' && (
              <div className="payment__upi-hero">
                {upiMode === 'qr' ? (
                  <>
                    {qrDataUrl ? (
                      <img className="payment__qr-img" src={qrDataUrl} alt="UPI QR code" />
                    ) : (
                      <div className="payment__qr-placeholder" />
                    )}
                    <p className="payment__qr-caption">Scan with any UPI app</p>
                  </>
                ) : (
                  <>
                    <MdQrCode2 className="payment__upi-icon" />
                    <p className="payment__upi-caption">Pay using your UPI ID</p>
                  </>
                )}
              </div>
            )}

            {paymentMethod === 'netbanking' && (
              <div className="payment__bank-hero">
                <MdAccountBalance className="payment__bank-icon" />
                <p className="payment__bank-caption">
                  {bank || 'Select your bank to continue'}
                </p>
                {nbStep === 'login' && (
                  <span className="payment__bank-secure">
                    <MdLock /> Secure bank login
                  </span>
                )}
              </div>
            )}

            <div className="payment__amount">
              <h2>Payment amount</h2>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="payment__form">
            {paymentMethod === 'card' && (
              <>
                <label className="payment__label" htmlFor="pay-holder">Card holder name</label>
                <input
                  id="pay-holder"
                  className="payment__input"
                  type="text"
                  autoComplete="off"
                  value={card.holder}
                  onChange={set('holder')}
                />
                {errors.holder && <span className="field-error">{errors.holder}</span>}

                <label className="payment__label" htmlFor="pay-number">Card Number</label>
                <input
                  id="pay-number"
                  className="payment__input"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  value={card.number}
                  onChange={set('number', groupCard)}
                />
                {errors.number && <span className="field-error">{errors.number}</span>}

                <div className="payment__row">
                  <div className="payment__col">
                    <label className="payment__label" htmlFor="pay-exp">Expiry date</label>
                    <input
                      id="pay-exp"
                      className="payment__input"
                      type="text"
                      autoComplete="off"
                      placeholder="MM/YY"
                      maxLength={5}
                      value={card.expiry}
                      onChange={set('expiry', (v) => {
                        const d = v.replace(/\D/g, '').slice(0, 4);
                        return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
                      })}
                    />
                    {errors.expiry && <span className="field-error">{errors.expiry}</span>}
                  </div>
                  <div className="payment__col">
                    <label className="payment__label" htmlFor="pay-cvv">CVV</label>
                    <input
                      id="pay-cvv"
                      className="payment__input"
                      type="password"
                      autoComplete="off"
                      maxLength={4}
                      value={card.cvv}
                      onChange={set('cvv', (v) => v.replace(/\D/g, '').slice(0, 4))}
                    />
                    {errors.cvv && <span className="field-error">{errors.cvv}</span>}
                  </div>
                </div>

                <div className="payment__actions">
                  <button type="button" className="payment__cancel" onClick={() => navigate('/cart')}>
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="payment__pay"
                    disabled={!items.length}
                    onClick={payCard}
                  >
                    Pay Now
                  </button>
                </div>
              </>
            )}

            {paymentMethod === 'upi' && (
              <>
                <div className="payment__tabs">
                  <button
                    type="button"
                    className={`payment__tab ${upiMode === 'id' ? 'is-active' : ''}`}
                    onClick={() => setUpiMode('id')}
                  >
                    Pay via UPI ID
                  </button>
                  <button
                    type="button"
                    className={`payment__tab ${upiMode === 'qr' ? 'is-active' : ''}`}
                    onClick={() => setUpiMode('qr')}
                  >
                    Scan QR Code
                  </button>
                </div>

                {upiMode === 'id' ? (
                  <>
                    <label className="payment__label" htmlFor="pay-upi">UPI ID</label>
                    <input
                      id="pay-upi"
                      className="payment__input"
                      type="text"
                      autoComplete="off"
                      placeholder="yourname@bank"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                    />
                    {errors.upiId && <span className="field-error">{errors.upiId}</span>}

                    <div className="payment__actions">
                      <button type="button" className="payment__cancel" onClick={() => navigate('/cart')}>
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="payment__pay"
                        disabled={!items.length}
                        onClick={payUpiById}
                      >
                        Verify &amp; Pay
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="payment__hint">
                      Open Google Pay, PhonePe, Paytm or any UPI app and scan the QR code
                      to pay <strong>${finalTotal.toFixed(2)}</strong>.
                    </p>

                    <div className="payment__actions">
                      <button type="button" className="payment__cancel" onClick={() => navigate('/cart')}>
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="payment__pay"
                        disabled={!items.length}
                        onClick={payUpiByQr}
                      >
                        I&rsquo;ve Completed the Payment
                      </button>
                    </div>
                  </>
                )}
              </>
            )}

            {paymentMethod === 'netbanking' && (
              <>
                {nbStep === 'select' ? (
                  <>
                    <label className="payment__label" htmlFor="pay-bank">Select Your Bank</label>
                    <select
                      id="pay-bank"
                      className="payment__input"
                      value={bank}
                      onChange={(e) => setBank(e.target.value)}
                    >
                      <option value="">Choose a bank</option>
                      {BANKS.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                    {errors.bank && <span className="field-error">{errors.bank}</span>}

                    <div className="payment__actions">
                      <button type="button" className="payment__cancel" onClick={() => navigate('/cart')}>
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="payment__pay"
                        disabled={!items.length}
                        onClick={proceedToBank}
                      >
                        Proceed to Bank
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="payment__hint">
                      You are being redirected to <strong>{bank}</strong>&rsquo;s secure net
                      banking login.
                    </p>

                    <label className="payment__label" htmlFor="nb-user">User ID / Customer ID</label>
                    <input
                      id="nb-user"
                      className="payment__input"
                      type="text"
                      inputMode="numeric"
                      autoComplete="off"
                      value={bankLogin.userId}
                      onChange={(e) => {
                        const digits = e.target.value.replace(/\D/g, '').slice(0, 12);
                        setBankLogin((b) => ({ ...b, userId: digits }));
                      }}
                    />
                    {errors.userId && <span className="field-error">{errors.userId}</span>}

                    <label className="payment__label" htmlFor="nb-pass">Password</label>
                    <input
                      id="nb-pass"
                      className="payment__input"
                      type="password"
                      autoComplete="off"
                      value={bankLogin.password}
                      onChange={(e) => setBankLogin((b) => ({ ...b, password: e.target.value }))}
                    />
                    {errors.password && <span className="field-error">{errors.password}</span>}

                    <div className="payment__actions">
                      <button type="button" className="payment__cancel" onClick={() => setNbStep('select')}>
                        Back
                      </button>
                      <button
                        type="button"
                        className="payment__pay"
                        disabled={!items.length}
                        onClick={payNetbanking}
                      >
                        Login &amp; Pay
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="payment__back">
        <BackButton to="/checkout" variant="accent" />
      </div>
    </div>
  );
}
