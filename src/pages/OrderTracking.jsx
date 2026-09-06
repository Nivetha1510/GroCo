import { Link } from 'react-router-dom';
import { MdLocalShipping, MdSupportAgent } from 'react-icons/md';
import { FaShoppingCart, FaCogs, FaBoxOpen, FaTruck, FaCheckCircle } from 'react-icons/fa';
import { useOrder } from '../context/OrderContext';
import './OrderTracking.css';

const DELIVERY_WINDOW_DAYS = 5;

const longDate = (date) =>
  date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

export default function OrderTracking() {
  const { order } = useOrder();

  const orderDate = order?.placedAt ? new Date(order.placedAt) : new Date();
  const etaDate = new Date(orderDate);
  etaDate.setDate(etaDate.getDate() + DELIVERY_WINDOW_DAYS);

  const STAGES = [
    { Icon: FaShoppingCart, title: 'Order Placed',    text: `We received your order on ${longDate(orderDate)}.`, done: true },
    { Icon: FaCogs,         title: 'Processing',      text: 'Your order is being prepared for shipment.',    done: true, active: true },
    { Icon: FaBoxOpen,      title: 'Shipped',         text: 'Your package has left the warehouse.',          done: false },
    { Icon: FaTruck,        title: 'Out for Delivery', text: 'Your package is on the way to your address.',  done: false },
    { Icon: FaCheckCircle,  title: 'Delivered',       text: 'Your package has been delivered.',             done: false },
  ];

  return (
    <div className="track">
      <h1 className="track__title">Order Tracking</h1>

      <div className="track__panel">
        <h2 className="track__heading">Estimated Delivery</h2>
        <div className="track__eta">
          <div>
            <p className="track__eta-label">Your order is expected to arrive by</p>
            <p className="track__eta-date">{longDate(etaDate)}</p>
          </div>
          <MdLocalShipping className="track__eta-icon" />
        </div>
      </div>

      <div className="track__panel">
        <h2 className="track__heading">Order Status</h2>

        <div className="track__progress">
          <div className="track__bar">
            <span style={{ width: '70%' }} />
          </div>
          <span className="track__percent">70% Complete</span>
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

      {order && (
        <p className="track__ref">
          Tracking reference for order placed{' '}
          {new Date(order.placedAt).toLocaleDateString()} · {order.items.length} item(s) ·{' '}
          ${order.total.toFixed(2)}
        </p>
      )}
    </div>
  );
}
