import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './SearchBar.css';

export default function SearchBar({ value, onChange, onSubmit, autoFocus }) {
  const controlled = value !== undefined;
  const [inner, setInner] = useState('');
  const term = controlled ? value : inner;

  const update = (v) => {
    if (controlled) onChange?.(v);
    else setInner(v);
  };

  return (
    <div className="searchbar">
      <FiSearch className="searchbar__icon" />
      <input
        className="searchbar__input"
        type="text"
        placeholder="Search....."
        value={term}
        autoFocus={autoFocus}
        onChange={(e) => update(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && term.trim()) onSubmit?.(term.trim());
        }}
      />
    </div>
  );
}
