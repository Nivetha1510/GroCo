import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { SHIPPING_FEE } from '../data/content';
import { COUPON_CODES } from '../data/discounts';

const CartContext = createContext(null);
const KEY = 'groco.cart';
const COUPON_KEY = 'groco.coupon';

const read = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => read(KEY, []));
  const [coupon, setCoupon] = useState(() => read(COUPON_KEY, null));
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem(COUPON_KEY, JSON.stringify(coupon));
  }, [coupon]);

  const addToCart = (product, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.id === product.id);
      if (found) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.cartName || product.name,
          price: product.price,
          image: product.image,
          qty,
        },
      ];
    });
    setToast(`${product.cartName || product.name} added to cart`);
  };

  const removeFromCart = (id) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  const updateQuantity = (id, qty) =>
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i))
    );

  const clearCart = () => {
    setItems([]);
    setCoupon(null);
  };

  const value = useMemo(() => {
    const count = items.reduce((n, i) => n + i.qty, 0);
    const subtotal = items.reduce((n, i) => n + i.price * i.qty, 0);
    const shipping = items.length ? SHIPPING_FEE : 0;
    const discountPercent = coupon ? COUPON_CODES[coupon.toUpperCase()] || 0 : 0;
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
      applyCoupon: setCoupon,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toast,
      clearToast: () => setToast(null),
    };
  }, [items, coupon, toast]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
