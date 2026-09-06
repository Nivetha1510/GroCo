import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdStorefront, MdEmail, MdCall } from 'react-icons/md';
import {
  FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn,
} from 'react-icons/fa';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { footerContent } from '../data/content';
import './Footer.css';

const SOCIALS = [FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const subscribe = () => {
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setSubscribed(false);
      return;
    }
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__col">
          <h3 className="footer__brand">
            <MdStorefront className="footer__brand-icon" />
            GroCo
          </h3>
          <p className="footer__text">{footerContent.description}</p>
          <div className="footer__socials">
            {SOCIALS.map((Icon, i) => (
              <a key={i} href="#" className="footer__social" aria-label="social link">
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">contact Info</h4>
          <ul className="footer__list">
            {footerContent.contact.map((c, i) => (
              <li key={i} className="footer__contact">
                {c.type === 'phone' ? <MdCall /> : <MdEmail />}
                <span>{c.value}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Quick Link</h4>
          <ul className="footer__list">
            {footerContent.quickLinks.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="footer__link">
                  <HiArrowNarrowRight />
                  <span>{l.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4 className="footer__heading">Newsletter</h4>
          <p className="footer__sub">Subscribe For Latest Updates</p>
          <input
            className="footer__input"
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="footer__subscribe" onClick={subscribe}>
            Subscribe
          </button>
          {subscribed && <p className="footer__ok">Subscribed!</p>}
        </div>
      </div>
    </footer>
  );
}
