import { useEffect } from 'react';
import { MdCheckCircle } from 'react-icons/md';
import { useCart } from '../context/CartContext';
import './CartToast.css';

export default function CartToast() {
  const { toast, clearToast } = useCart();

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(clearToast, 2000);
    return () => clearTimeout(timer);
  }, [toast, clearToast]);

  if (!toast) return null;

  return (
    <div className="cart-toast" role="status">
      <MdCheckCircle />
      <span>{toast}</span>
    </div>
  );
}
