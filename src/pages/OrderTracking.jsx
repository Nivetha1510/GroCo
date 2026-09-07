import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdLocalShipping, MdSupportAgent } from 'react-icons/md';
import { FaShoppingCart, FaCogs, FaBoxOpen, FaTruck, FaCheckCircle } from 'react-icons/fa';
import { useOrder, ORDER_STATUSES, ORDER_PROGRESS } from '../context/OrderContext';
import './OrderTracking.css';

/* Quick-commerce grocery delivery — a fixed 30-minute window, counting down
   as the order's status progresses (Delivered = arrived). */
const DELIVERY_WINDOW_MINUTES = 30;

const longDate = (date) =>
  date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

const STAGE_META = [
  { Icon: FaShoppingCart, title: 'Order Placed', text: (orderDate) => `We received your order on ${longDate(orderDate)}.` },
  { Icon: FaCogs, title: 'Processing', text: () => 'Your order is being prepared for shipment.' },
  { Icon: FaBoxOpen, title: 'Shipped', text: () => 'Your package has left the warehouse.' },
  { Icon: FaTruck, title: 'Out for Delivery', text: () => 'Your package is on the way to your address.' },
  { Icon: FaCheckCircle, title: 'Delivered', text: () => 'Your package has been delivered.' },
];

export default function OrderTracking() {
  const { orders, updateOrderStatus } = useOrder();
  const [selectedId, setSelectedId] = useState(null);

  if (!orders.length) {
    return (
      <div className="track">
        <h1 className="track__title">Order Tracking</h1>
        <div className="track__panel">
          <p className="track__help-text">No active order found.</p>
        </div>
      </div>
    );
  }

  const order = orders.find((o) => o.id === selectedId) || orders[0];

  const orderDate = order.placedAt ? new Date(order.placedAt) : new Date();

  const currentIndex = Math.max(0, ORDER_STATUSES.indexOf(order.status));
  const progress = ORDER_PROGRESS[order.status] ?? ORDER_PROGRESS['Order Placed'];
  const delivered = order.status === 'Delivered';
  const minutesLeft = Math.max(0, Math.round(DELIVERY_WINDOW_MINUTES * (1 - progress / 100)));

  const STAGES = STAGE_META.map((meta, i) => ({
    ...meta,
    text: meta.text(orderDate),
    done: i <= currentIndex,
    active: i === currentIndex,
  }));

  return (
    <div className="track">
      <h1 className="track__title">Order Tracking</h1>

      <div className="track__panel">
        <h2 className="track__heading track__heading--tight">Order #{order.id}</h2>
        <div className="track__eta">
          <div>
            <p className="track__eta-label">
              {delivered ? 'Your order has arrived' : 'Your order will arrive in'}
            </p>
            <p className="track__eta-date">{delivered ? 'Delivered' : `${minutesLeft} min`}</p>
          </div>
          <MdLocalShipping className="track__eta-icon" />
        </div>
      </div>

      <div className="track__panel">
        <h2 className="track__heading">Order Status</h2>

        <div className="track__progress">
          <div className="track__bar">
            <span style={{ width: `${progress}%` }} />
          </div>
          <span className="track__percent">{progress}% Complete</span>
        </div>

        <ul className="track__stages">
          {STAGES.map(({ Icon, title, text, done, active }) => (
            <li className={`track__stage ${done ? 'is-done' : ''}`} key={title}>
              <span className="track__stage-icon"><Icon /></span>
              <div className="track__stage-body">
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
              {active && <span className="track__stage-line" />}
            </li>
          ))}
        </ul>
      </div>

      {orders.length > 1 && (
        <div className="track__panel">
          <h2 className="track__heading">Order History</h2>
          <ul className="track__history-list">
            {orders.map((o) => (
              <li key={o.id}>
                <button
                  type="button"
                  className={`track__history-item ${o.id === order.id ? 'is-selected' : ''}`}
                  onClick={() => setSelectedId(o.id)}
                >
                  <span className="track__history-id">#{o.id}</span>
                  <span className="track__history-meta">
                    {new Date(o.placedAt).toLocaleDateString()} · {o.items.length} item(s) · ₹{o.total.toFixed(2)}
                  </span>
                  <span className="track__history-status">{o.status}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="track__panel">
        <div className="track__help">
          <div>
            <h2 className="track__heading track__heading--tight">Need Help?</h2>
            <p className="track__help-text">
              If you have any questions about your order, our support team is here to help.
            </p>
          </div>
          <Link to="/support" className="track__support">
            <MdSupportAgent />
            <span>Contact Support</span>
          </Link>
        </div>
      </div>

      {import.meta.env.DEV && (
        <div className="track__panel">
          <h2 className="track__heading track__heading--tight">Dev only — simulate status</h2>
          <p className="track__help-text" style={{ marginBottom: 12 }}>
            Not shown in production builds. Applies to order #{order.id}.
          </p>
          {ORDER_STATUSES.map((s) => (
            <button
              key={s}
              type="button"
              disabled={s === order.status}
              onClick={() => updateOrderStatus(order.id, s)}
              style={{ marginRight: 8, marginBottom: 8 }}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
