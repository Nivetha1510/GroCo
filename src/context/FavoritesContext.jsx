import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useAuth } from './AuthContext';
import { readNamespaced, write } from '../utils/storage';

const FavoritesContext = createContext(null);

/* Namespaced per signed-in account (or "guest" when logged out) so
   switching accounts on the same browser never shows one person's
   wishlist to another. */
const favoritesKey = (ns) => `groco.favorites.${ns}`;

const readIds = (ns) => readNamespaced(favoritesKey(ns), 'groco.favorites', []);

export function FavoritesProvider({ children }) {
  const { user } = useAuth();
  const ns = user?.email || 'guest';

  const [ids, setIds] = useState(() => readIds(ns));
  const prevNsRef = useRef(ns);

  /* Account changed (login/logout/switch) — load that account's own
     wishlist. Logging in from a guest session folds any favorites picked
     while browsing anonymously into the account instead of losing them. */
  useEffect(() => {
    const prevNs = prevNsRef.current;
    prevNsRef.current = ns;
    if (prevNs === ns) return;

    if (prevNs === 'guest' && ns !== 'guest') {
      const guestIds = readIds('guest');
      if (guestIds.length) {
        const merged = Array.from(new Set([...readIds(ns), ...guestIds]));
        write(favoritesKey(ns), merged);
        write(favoritesKey('guest'), []);
        setIds(merged);
        return;
      }
    }

    setIds(readIds(ns));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ns]);

  const toggleFavorite = (id) =>
    setIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      write(favoritesKey(ns), next);
      return next;
    });

  const isFavorite = (id) => ids.includes(id);

  return (
    <FavoritesContext.Provider value={{ ids, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);
