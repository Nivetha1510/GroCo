import { Navigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrder, isShippingComplete } from '../context/OrderContext';

/* Guards /payment: it must only be reachable via Cart -> Checkout -> Payment,
   never by typing the URL directly or reusing a stale link after an order. */
export default function RequirePayment({ children }) {
  const { items } = useCart();
  const { user } = useAuth();
  const { shipping } = useOrder();

  if (!items.length) return <Navigate to="/cart" replace />;
  if (!user) return <Navigate to="/login" replace />;
  if (!isShippingComplete(shipping)) return <Navigate to="/checkout" replace />;

  return children;
}
