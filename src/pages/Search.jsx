import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import BuyNowCard from '../components/BuyNowCard';
import { products } from '../data/products';
import { allCategoryProducts } from '../data/categoryProducts';
import './Search.css';

/* No search-results frame exists in the prototype — only the search bar
   component (frame 38). Results reuse the two card styles already in the
   design so nothing new is invented visually. */
export default function Search() {
  const [params, setParams] = useSearchParams();
  const [term, setTerm] = useState(params.get('q') || '');

  useEffect(() => {
    setTerm(params.get('q') || '');
  }, [params]);

  const query = term.trim().toLowerCase();

  const catalogHits = useMemo(
    () =>
      query
        ? products.filter(
            (p) =>
              p.name.toLowerCase().includes(query) ||
              p.cartName.toLowerCase().includes(query)
          )
        : [],
    [query]
  );

  const gridHits = useMemo(() => {
    if (!query) return [];
    const matches = allCategoryProducts.filter(
      (p) =>
        p.cartName.toLowerCase().includes(query) ||
        p.name.toLowerCase().includes(query)
    );
    const seen = new Set();
    return matches.filter((p) => {
      if (seen.has(p.cartName)) return false;
      seen.add(p.cartName);
      return true;
    });
  }, [query]);

  const total = catalogHits.length + gridHits.length;

  return (
    <div className="search">
      <h1 className="page-title">Search</h1>

      <div className="search__bar">
        <SearchBar
          value={term}
          autoFocus
          onChange={(v) => {
            setTerm(v);
            setParams(v ? { q: v } : {}, { replace: true });
          }}
          onSubmit={(v) => setParams({ q: v }, { replace: true })}
        />
      </div>

      {query === '' && (
        <p className="search__hint">Type a product name to search the store.</p>
      )}

      {query !== '' && total === 0 && (
        <p className="search__hint">No products match “{term}”.</p>
      )}

      {catalogHits.length > 0 && (
        <div className="container search__section">
          <div className="grid-3">
            {catalogHits.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {gridHits.length > 0 && (
        <div className="container search__section">
          <div className="search__grid">
            {gridHits.map((p) => (
              <BuyNowCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
