import { createContext, useContext, useEffect, useState } from 'react';

const OrderContext = createContext(null);
const SHIPPING_KEY = 'groco.shipping';

const EMPTY_SHIPPING = {
  firstName: '', lastName: '', email: '', phone: '',
  street: '', city: '', state: '', zip: '', country: 'India',
  paymentOption: 'card', promo: '',
};

const REQUIRED_SHIPPING_FIELDS = [
  'firstName', 'lastName', 'email', 'phone', 'street', 'country', 'state', 'city', 'zip',
];

const read = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

/* Mirrors the validation in Checkout.jsx — used to gate access to /payment
   so a stale or partially filled address can't be treated as a completed checkout. */
export const isShippingComplete = (shipping) => {
  if (!shipping) return false;
  const hasAllFields = REQUIRED_SHIPPING_FIELDS.every((key) => String(shipping[key] || '').trim());
  if (!hasAllFields) return false;
  if (!/^\S+@\S+\.\S+$/.test(shipping.email.trim())) return false;
  if (!/^\d{10}$/.test(shipping.phone.trim())) return false;
  if (!/^\d{6}$/.test(shipping.zip.trim())) return false;
  return true;
};

export function OrderProvider({ children }) {
  const [shipping, setShipping] = useState(() => read(SHIPPING_KEY, EMPTY_SHIPPING));
  const [order, setOrder] = useState(null);

  useEffect(() => {
    localStorage.setItem(SHIPPING_KEY, JSON.stringify(shipping));
  }, [shipping]);

  const placeOrder = (payload) => setOrder(payload);
  const clearShipping = () => setShipping(EMPTY_SHIPPING);
  const resetOrder = () => {
    setOrder(null);
    clearShipping();
  };

  return (
    <OrderContext.Provider
      value={{ shipping, setShipping, order, placeOrder, clearShipping, resetOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export const useOrder = () => useContext(OrderContext);
