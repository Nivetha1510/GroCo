import { createContext, useContext, useEffect, useState } from 'react';

const FavoritesContext = createContext(null);
const KEY = 'groco.favorites';

export function FavoritesProvider({ children }) {
  const [ids, setIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(ids));
  }, [ids]);

  const toggleFavorite = (id) =>
    setIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const isFavorite = (id) => ids.includes(id);

  return (
    <FavoritesContext.Provider value={{ ids, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);
