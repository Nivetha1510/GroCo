import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { SHIPPING_FEE } from '../data/content';
import { COUPON_CODES } from '../data/discounts';
import { useAuth } from './AuthContext';
import { readNamespaced, write } from '../utils/storage';

const CartContext = createContext(null);

/* Prices are per kilogram (weight items) or per liter (liquids like milk).
   A gram/ml line's amount is its qty / 1000. */
export const UNIT_STEP = { kg: 1, g: 100, L: 1, ml: 100 };
export const UNIT_MIN = { kg: 1, g: 100, L: 1, ml: 100 };
export const DEFAULT_QTY = { kg: 1, g: 500, L: 1, ml: 500 };

/* Which two units a product's toggle offers, keyed by its unitType. */
export const UNIT_PAIRS = { weight: ['g', 'kg'], volume: ['ml', 'L'] };

const SMALL_UNITS = new Set(['g', 'ml']);
const toBaseQty = (item) => (SMALL_UNITS.has(item.unit) ? item.qty / 1000 : item.qty);

/* Label for the unit a line's price is quoted per (e.g. "₹60/kg" vs "₹60/L"). */
export const baseUnitLabel = (unit) => (unit === 'ml' || unit === 'L' ? 'L' : 'kg');

/* Cart and coupon are namespaced per signed-in account (or "guest" when
   logged out) so switching accounts on the same browser never shows one
   person's cart to another. */
const cartKey = (ns) => `groco.cart.${ns}`;
const couponKey = (ns) => `groco.coupon.${ns}`;

/* Carts saved before the unit selector existed have no `unit` field;
   treat those lines as kilograms so their totals don't change. */
const readItems = (ns) =>
  readNamespaced(cartKey(ns), 'groco.cart', []).map((i) => ({ ...i, unit: i.unit || 'kg' }));

const readCoupon = (ns) => readNamespaced(couponKey(ns), 'groco.coupon', null);

/* Folds items added while browsing as a guest into the account's own cart
   on login, so nothing the person just picked out gets silently dropped. */
const mergeItems = (accountItems, guestItems) => {
  const merged = [...accountItems];
  guestItems.forEach((gi) => {
    const idx = merged.findIndex((i) => i.id === gi.id && i.unit === gi.unit);
    if (idx >= 0) merged[idx] = { ...merged[idx], qty: merged[idx].qty + gi.qty };
    else merged.push(gi);
  });
  return merged;
};

export function CartProvider({ children }) {
  const { user } = useAuth();
  const ns = user?.email || 'guest';

  const [items, setItems] = useState(() => readItems(ns));
  const [coupon, setCoupon] = useState(() => readCoupon(ns));
  const [toast, setToast] = useState(null);
  const prevNsRef = useRef(ns);

  /* Account changed (login/logout/switch) — load that account's own cart
     instead of carrying over whoever's cart was active before. Logging in
     from a guest session folds the guest cart into the account instead of
     losing it. */
  useEffect(() => {
    const prevNs = prevNsRef.current;
    prevNsRef.current = ns;
    if (prevNs === ns) return;

    if (prevNs === 'guest' && ns !== 'guest') {
      const guestItems = readItems('guest');
      if (guestItems.length) {
        const merged = mergeItems(readItems(ns), guestItems);
        write(cartKey(ns), merged);
        write(cartKey('guest'), []);
        setItems(merged);
        setCoupon(readCoupon(ns));
        return;
      }
    }

    setItems(readItems(ns));
    setCoupon(readCoupon(ns));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ns]);

  const addToCart = (product, qty = 1, unit = 'kg') => {
    setItems((prev) => {
      const found = prev.find((i) => i.id === product.id && i.unit === unit);
      const next = found
        ? prev.map((i) =>
            i.id === product.id && i.unit === unit ? { ...i, qty: i.qty + qty } : i
          )
        : [
            ...prev,
            {
              id: product.id,
              name: product.cartName || product.name,
              price: product.price,
              image: product.image,
              qty,
              unit,
            },
          ];
      write(cartKey(ns), next);
      return next;
    });
    setToast(`${qty} ${unit} of ${product.cartName || product.name} added to cart`);
  };

  const removeFromCart = (id, unit) =>
    setItems((prev) => {
      const next = prev.filter((i) => !(i.id === id && i.unit === unit));
      write(cartKey(ns), next);
      return next;
    });

  const updateQuantity = (id, unit, qty) =>
    setItems((prev) => {
      const next = prev.map((i) =>
        i.id === id && i.unit === unit ? { ...i, qty: Math.max(UNIT_MIN[unit], qty) } : i
      );
      write(cartKey(ns), next);
      return next;
    });

  const clearCart = () => {
    setItems([]);
    setCoupon(null);
    write(cartKey(ns), []);
    write(couponKey(ns), null);
  };

  const applyCoupon = (code) => {
    setCoupon(code);
    write(couponKey(ns), code);
  };

  const value = useMemo(() => {
    const count = items.length;
    const subtotal = items.reduce((n, i) => n + i.price * toBaseQty(i), 0);
    const shipping = items.length ? SHIPPING_FEE : 0;
    const discountPercent = coupon ? COUPON_CODES[coupon] || 0 : 0;
    const discountAmount = subtotal * discountPercent;
    return {
      items,
      count,
      subtotal,
      shipping,
      discountPercent,
      discountAmount,
      total: subtotal + shipping - discountAmount,
      coupon,
      couponValid: discountPercent > 0,
      applyCoupon,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toast,
      clearToast: () => setToast(null),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, coupon, toast, ns]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
