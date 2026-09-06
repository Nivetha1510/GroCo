import { Link } from 'react-router-dom';
import { MdCall, MdEmail } from 'react-icons/md';
import { footerContent } from '../data/content';
import './Support.css';

/* No Contact Support frame exists. Minimal page reusing the contact
   details already published in the footer of every frame. */
export default function Support() {
  return (
    <div className="support">
      <h1 className="page-title">Contact Support</h1>

      <div className="support__card">
        <p className="support__lead">
          Our support team is here to help with anything about your order.
        </p>

        <ul className="support__list">
          {footerContent.contact.map((c, i) => (
            <li key={i}>
              {c.type === 'phone' ? <MdCall /> : <MdEmail />}
              <span>{c.value}</span>
            </li>
          ))}
        </ul>

        <Link to="/contact" className="btn-accent support__cta">
          Send us a message
        </Link>
      </div>
    </div>
  );
}
