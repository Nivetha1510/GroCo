import { useState } from 'react';
import './Contact.css';

const EMPTY = { name: '', email: '', contact: '', newsletter: false };

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const set = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
    setSent(false);
  };

  const setContact = (e) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
    setForm((f) => ({ ...f, contact: digits }));
    setSent(false);
  };

  const submit = () => {
    const next = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.email.trim()) next.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) next.email = 'Enter a valid email address';
    if (!form.contact.trim()) next.contact = 'Contact number is required';
    else if (!/^\d{10}$/.test(form.contact.trim())) next.contact = 'Enter a valid 10-digit phone number';

    setErrors(next);
    if (Object.keys(next).length) return;

    setSent(true);
    setForm(EMPTY);
  };

  return (
    <div className="contact">
      <h1 className="contact__title">Contact  Us</h1>

      <div className="contact__card">
        <h2 className="contact__heading">
          Contact <span>Us</span>
        </h2>
        <p className="contact__sub">Let’s get in touch!</p>

        <div className="contact__field">
          <input
            className="contact__input"
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={set('name')}
          />
          {errors.name && <span className="field-error">{errors.name}</span>}
        </div>

        <div className="contact__field">
          <input
            className="contact__input"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={set('email')}
          />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>

        <div className="contact__field">
          <input
            className="contact__input"
            type="text"
            inputMode="numeric"
            placeholder="Phone Number"
            value={form.contact}
            onChange={setContact}
          />
          {errors.contact && <span className="field-error">{errors.contact}</span>}
        </div>

        <label className="contact__check">
          <input
            type="checkbox"
            checked={form.newsletter}
            onChange={set('newsletter')}
          />
          <span>I would like to revive newsletter</span>
        </label>

        <button type="button" className="contact__submit" onClick={submit}>
          Submit
        </button>

        {sent && <p className="contact__ok">Thanks — your message has been sent.</p>}
      </div>
    </div>
  );
}
