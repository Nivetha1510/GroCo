import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { readNamespaced, write } from '../utils/storage';

const OrderContext = createContext(null);

export const ORDER_STATUSES = ['Order Placed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'];

export const ORDER_PROGRESS = {
  'Order Placed': 20,
  Processing: 40,
  Shipped: 60,
  'Out for Delivery': 80,
  Delivered: 100,
};

const generateOrderId = () =>
  `ORD-${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

const EMPTY_SHIPPING = {
  firstName: '', lastName: '', email: '', phone: '',
  street: '', city: '', state: '', zip: '', country: 'India',
  paymentOption: 'card', promo: '',
};

const REQUIRED_SHIPPING_FIELDS = [
  'firstName', 'lastName', 'email', 'phone', 'street', 'country', 'state', 'city', 'zip',
];

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

/* Shipping address and order history are namespaced per signed-in account
   (or "guest" when logged out) so switching accounts on the same browser
   never shows one person's address or orders to another. */
const shippingKey = (ns) => `groco.shipping.${ns}`;
const ordersKey = (ns) => `groco.orders.${ns}`;

const readShipping = (ns) => readNamespaced(shippingKey(ns), 'groco.shipping', EMPTY_SHIPPING);
const readOrders = (ns) => readNamespaced(ordersKey(ns), 'groco.orders', []);

export function OrderProvider({ children }) {
  const { user } = useAuth();
  const ns = user?.email || 'guest';

  const [shipping, setShippingState] = useState(() => readShipping(ns));
  const [orders, setOrders] = useState(() => readOrders(ns));

  /* Account changed (login/logout/switch) — load that account's own address
     and order history instead of carrying over whoever was active before. */
  useEffect(() => {
    setShippingState(readShipping(ns));
    setOrders(readOrders(ns));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ns]);

  const setShipping = (next) => {
    setShippingState(next);
    write(shippingKey(ns), next);
  };

  /* Always stamps a fresh id/status here (rather than trusting the caller's payload)
     so a new order can never inherit a previous order's tracking status, and is
     prepended so it becomes the "current" order and appears first in history. */
  const placeOrder = (payload) => {
    setOrders((prev) => {
      const newOrder = { ...payload, id: payload.id || generateOrderId(), status: 'Order Placed' };
      const next = [newOrder, ...prev];
      write(ordersKey(ns), next);
      return next;
    });
  };

  const updateOrderStatus = (orderId, status) =>
    setOrders((prev) => {
      const next = prev.map((o) => (o.id === orderId ? { ...o, status } : o));
      write(ordersKey(ns), next);
      return next;
    });

  const clearShipping = () => setShipping(EMPTY_SHIPPING);
  const resetOrder = () => {
    setOrders([]);
    write(ordersKey(ns), []);
    clearShipping();
  };

  return (
    <OrderContext.Provider
      value={{
        shipping,
        setShipping,
        orders,
        order: orders[0] || null,
        placeOrder,
        updateOrderStatus,
        clearShipping,
        resetOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export const useOrder = () => useContext(OrderContext);
