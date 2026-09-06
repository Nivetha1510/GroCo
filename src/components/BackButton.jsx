import { useNavigate } from 'react-router-dom';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import './BackButton.css';

export default function BackButton({ to, label = 'Back', variant = 'ghost' }) {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className={`back-btn back-btn--${variant}`}
      onClick={() => (to ? navigate(to) : navigate(-1))}
    >
      <HiArrowNarrowLeft />
      <span>{label}</span>
    </button>
  );
}
