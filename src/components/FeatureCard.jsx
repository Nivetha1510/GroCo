import { Link } from 'react-router-dom';
import './FeatureCard.css';

export default function FeatureCard({ feature }) {
  return (
    <article className="feature-card">
      <div className="feature-card__inner">
        <div className="feature-card__media">
          <img src={feature.image} alt={feature.title} />
        </div>
        <h3 className="feature-card__title">{feature.title}</h3>
        <p className="feature-card__text">{feature.text}</p>
      </div>
    </article>
  );
}
