import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { categoryPanelItems } from '../data/content';
import './CategoryPanel.css';

const OPEN_KEY = 'groco.categoryPanelOpen';

const readOpen = () => {
  try {
    const raw = sessionStorage.getItem(OPEN_KEY);
    return raw === null ? true : raw === 'true';
  } catch {
    return true;
  }
};

/* Side panel from frames 01 and 43–48. The active category is
   highlighted with the pale peach fill shown in the design. The
   open/closed state persists only for the current browser session. */
export default function CategoryPanel() {
  const [open, setOpen] = useState(readOpen);

  const toggle = () => {
    setOpen((prev) => {
      const next = !prev;
      try {
        sessionStorage.setItem(OPEN_KEY, String(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  };

  return (
    <aside className="cat-panel">
      <button
        type="button"
        className="cat-panel__head"
        aria-expanded={open}
        onClick={toggle}
      >
        <h2 className="cat-panel__title">Categories</h2>
        <span className={`cat-panel__chevron ${open ? '' : 'is-closed'}`} />
      </button>
      {open && (
        <ul className="cat-panel__list">
          {categoryPanelItems.map((item) => (
            <li key={item.id}>
              <NavLink
                to={`/categories/${item.id}`}
                className={({ isActive }) =>
                  `cat-panel__item ${isActive ? 'is-active' : ''}`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
