import './StepProgress.css';

const STEPS = ['Shipping', 'Payment', 'Confirm'];

/* Progress indicator from frames 53, 54, 65. `current` is 1-based. */
export default function StepProgress({ current = 1 }) {
  return (
    <div className="steps">
      {STEPS.map((label, i) => {
        const n = i + 1;
        const done = n <= current;
        return (
          <div className="steps__item" key={label}>
            <span className={`steps__dot ${done ? 'is-done' : ''}`}>{n}</span>
            <span className={`steps__label ${done ? 'is-done' : ''}`}>{label}</span>
            {n < STEPS.length && (
              <span className={`steps__bar ${n < current ? 'is-done' : ''}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
