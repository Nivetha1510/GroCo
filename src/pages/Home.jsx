import { Link } from 'react-router-dom';
import SectionRibbon from '../components/SectionRibbon';
import FeatureCard from '../components/FeatureCard';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import ReviewCard from '../components/ReviewCard';
import BlogCard from '../components/BlogCard';
import { homeProducts } from '../data/products';
import { features, categories, reviews, blogs } from '../data/content';
import hero from '../assets/images/hero-vegetables-wide.jpg';
import './Home.css';

export default function Home() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="hero">
        <img className="hero__img" src={hero} alt="" />
        <div className="hero__content">
          <h1 className="hero__title">
            Fresh And <span>Organic</span> Products For You
          </h1>
          <p className="hero__text">
            Lorem ipsum Dolor,sit Amet Consectetur Adipisicing  Elite .{'\n'}
            Earum Aials Volupats Labore Est.Dolorum Tenetur!
          </p>
          <Link to="/categories" className="btn-outline hero__cta">
            Shop Now
          </Link>
        </div>
      </section>

      {/* ---------- Our Features ---------- */}
      <section className="section" id="features">
        <div className="container">
          <SectionRibbon lead="Our" label="Features" />
          <div className="grid-3">
            {features.map((f) => (
              <FeatureCard key={f.id} feature={f} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Our products ---------- */}
      <section className="section" id="products">
        <div className="container">
          <SectionRibbon lead="Our" label="products" />
          <div className="grid-3">
            {homeProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Our Categories ---------- */}
      <section className="section" id="categories">
        <div className="container">
          <SectionRibbon lead="Our" label="Categories" />
          <div className="grid-3">
            {categories.slice(0, 3).map((c) => (
              <CategoryCard key={c.id} category={c} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Customer's Review ---------- */}
      <section className="section" id="review">
        <div className="container container--wide">
          <SectionRibbon lead="Customer’s" label="Review" />
          <div className="grid-3 grid-3--reviews">
            {reviews.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Our Blog ---------- */}
      <section className="section" id="blog">
        <div className="container">
          <SectionRibbon lead="Our" label="Blog" />
          <div className="grid-3 grid-3--blog">
            {blogs.map((b) => (
              <BlogCard key={b.id} blog={b} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
