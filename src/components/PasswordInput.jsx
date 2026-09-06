import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './PasswordInput.css';

/* Drop-in replacement for <input type="password">. Renders inside a
   position:relative wrapper supplied by the caller. */
export default function PasswordInput({ id, className = '', ...props }) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <input
        id={id}
        type={visible ? 'text' : 'password'}
        className={className}
        {...props}
      />
      <button
        type="button"
        className="password-toggle"
        tabIndex={-1}
        aria-label={visible ? 'Hide password' : 'Show password'}
        onClick={() => setVisible((v) => !v)}
      >
        {visible ? <FaEyeSlash /> : <FaEye />}
      </button>
    </>
  );
}
