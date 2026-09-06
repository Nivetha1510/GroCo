import { Link } from 'react-router-dom';
import './CategoryCard.css';

export default function CategoryCard({ category }) {
  return (
    <article className="category-card">
      <div className="category-card__inner">
        <div className="category-card__media">
          <img src={category.image} alt={category.title} />
        </div>
        <h3 className="category-card__title">{category.title}</h3>
        <p className="category-card__offer">{category.offer}</p>
        <Link to={`/categories/${category.id}`} className="btn-outline category-card__btn">
          Show More
        </Link>
      </div>
    </article>
  );
}
