import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import PasswordInput from '../components/PasswordInput';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

/* Front-end only, per the brief — there is no email service, so
   "forgot password" verifies the account exists, then lets the
   user set a new password directly instead of emailing a reset link. */
export default function ForgotPassword() {
  const [step, setStep] = useState('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);
  const { findAccount, resetPassword } = useAuth();
  const navigate = useNavigate();

  const submitEmail = () => {
    const next = {};
    if (!email.trim()) next.email = 'Email-Id is required';
    else if (!/^\S+@\S+\.\S+$/.test(email.trim())) next.email = 'Enter a valid email address';

    setErrors(next);
    if (Object.keys(next).length) return;

    const result = findAccount(email.trim());
    if (!result.success) {
      setErrors({ email: result.error });
      return;
    }
    setErrors({});
    setStep('reset');
  };

  const submitReset = () => {
    const next = {};
    if (!password) next.password = 'Password is required';
    else if (password.length < 6) next.password = 'Password must be at least 6 characters';
    if (confirm !== password) next.confirm = 'Passwords do not match';

    setErrors(next);
    if (Object.keys(next).length) return;

    const result = resetPassword(email.trim(), password);
    if (!result.success) {
      setErrors({ form: result.error });
      return;
    }
    setDone(true);
  };

  if (done) {
    return (
      <div className="auth">
        <h1 className="auth__title">Password Reset</h1>
        <div className="auth__card">
          <div className="auth__avatar"><FaUser /></div>
          <p className="auth__foot" style={{ marginTop: 0 }}>
            Your password has been reset successfully.
          </p>
          <button
            type="button"
            className="auth__submit"
            onClick={() => navigate('/login')}
          >
            Log In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth">
      <h1 className="auth__title">Forgot Password</h1>

      <div className="auth__card">
        <div className="auth__avatar"><FaUser /></div>

        {step === 'email' ? (
          <>
            <label className="auth__label" htmlFor="fp-email">Email-Id</label>
            <input
              id="fp-email"
              className="auth__input"
              type="email"
              placeholder="Enter Your Mail-id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submitEmail()}
            />
            {errors.email && <span className="field-error">{errors.email}</span>}

            <button type="button" className="auth__submit" onClick={submitEmail}>
              Continue
            </button>
          </>
        ) : (
          <>
            <label className="auth__label" htmlFor="fp-password">New Password</label>
            <div className="auth__password-wrap">
              <PasswordInput
                id="fp-password"
                className="auth__input"
                placeholder="Enter New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errors.password && <span className="field-error">{errors.password}</span>}

            <label className="auth__label" htmlFor="fp-confirm">Confirm Password</label>
            <div className="auth__password-wrap">
              <PasswordInput
                id="fp-confirm"
                className="auth__input"
                placeholder="Re-enter New Password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && submitReset()}
              />
            </div>
            {errors.confirm && <span className="field-error">{errors.confirm}</span>}
            {errors.form && <span className="field-error">{errors.form}</span>}

            <button type="button" className="auth__submit" onClick={submitReset}>
              Reset
            </button>
          </>
        )}

        <p className="auth__foot">
          Remembered Your Password{' '}
          <Link to="/login" className="auth__link">Log In?</Link>
        </p>
      </div>
    </div>
  );
}
