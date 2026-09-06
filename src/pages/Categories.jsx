import { useParams } from 'react-router-dom';
import CategoryPanel from '../components/CategoryPanel';
import BuyNowCard from '../components/BuyNowCard';
import BackButton from '../components/BackButton';
import { categoryGrids } from '../data/categoryProducts';
import './Categories.css';

export default function Categories() {
  const { category } = useParams();
  const grid = categoryGrids[category] || categoryGrids.default;

  return (
    <div className="categories">
      <div className="categories__inner">
        <CategoryPanel />

        <div className="categories__main">
          <div className="categories__grid">
            {grid.map((p) => (
              <BuyNowCard key={p.id} product={p} />
            ))}
          </div>
          <div className="categories__back">
            <BackButton to="/" />
          </div>
        </div>
      </div>
    </div>
  );
}
