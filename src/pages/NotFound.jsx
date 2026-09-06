import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ padding: '80px 24px 140px', textAlign: 'center' }}>
      <h1 className="page-title">Page not found</h1>
      <p style={{ marginTop: 20 }}>
        <Link to="/" style={{ color: 'var(--accent-strong)', fontWeight: 600 }}>
          Back to Home
        </Link>
      </p>
    </div>
  );
}
