import { Link, Navigate } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa';
import StepProgress from '../components/StepProgress';
import { useOrder } from '../context/OrderContext';
import './Confirmation.css';

export default function Confirmation() {
  const { order } = useOrder();

  if (!order) return <Navigate to="/cart" replace />;

  return (
    <div className="confirm">
      <h1 className="confirm__thanks">Thank You!</h1>

      <div className="confirm__panel">
        <div className="confirm__steps">
          <StepProgress current={3} />
        </div>

        <div className="confirm__check">
          <FaCheck />
        </div>

        <h2 className="confirm__title">Payment Confirmed</h2>
        <p className="confirm__lead">
          Thank you for your purchase! Your order has been successfully processed.
          <br />
          Order ID: <strong>{order.id}</strong>
        </p>

        <section className="confirm__summary">
          <h3 className="confirm__summary-title">Order Summary</h3>

          <ul className="confirm__items">
            {order.items.map((item) => (
              <li className="confirm__item" key={`${item.id}-${item.unit}`}>
                <img src={item.image} alt="" />
                <div className="confirm__item-meta">
                  <h4>{item.name}</h4>
                  <p>Quantity: {item.qty} {item.unit}</p>
                </div>
                <span className="confirm__item-price">
                  ₹{(item.price * (item.unit === 'g' ? item.qty / 1000 : item.qty)).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <dl className="confirm__totals">
            <div><dt>Subtotal</dt><dd>₹{order.subtotal.toFixed(2)}</dd></div>
            <div><dt>Shipping</dt><dd>₹{order.shipping.toFixed(2)}</dd></div>
            {order.couponValid && (
              <div>
                <dt>Coupon ({Math.round(order.couponDiscountPercent * 100)}%)</dt>
                <dd>&minus;₹{order.couponDiscountAmount.toFixed(2)}</dd>
              </div>
            )}
            {order.promoValid && (
              <div>
                <dt>Promo ({Math.round(order.promoDiscountPercent * 100)}%)</dt>
                <dd>&minus;₹{order.promoDiscountAmount.toFixed(2)}</dd>
              </div>
            )}
            <div className="is-total"><dt>Total</dt><dd>₹{order.total.toFixed(2)}</dd></div>
          </dl>
        </section>

        <section className="confirm__next">
          <h3 className="confirm__next-title">Next Steps</h3>
          <p>
            You will receive an email confirmation shortly with your order details and
            tracking information.
          </p>
          <p>If you have any questions, please contact our support team.</p>
        </section>

        <div className="confirm__actions">
          <Link to="/categories" className="confirm__continue">Continue Shopping</Link>
          <Link to="/tracking" className="confirm__tracking">View Tracking Details</Link>
        </div>
      </div>
    </div>
  );
}
