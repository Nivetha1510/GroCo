import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const scrollToSection = () => {
        const el = document.getElementById(id);
        if (!el) return false;
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return true;
      };
      if (!scrollToSection()) {
        const timer = setTimeout(scrollToSection, 100);
        return () => clearTimeout(timer);
      }
      return undefined;
    }
    window.scrollTo({ top: 0 });
    return undefined;
  }, [pathname, hash]);

  return null;
}
