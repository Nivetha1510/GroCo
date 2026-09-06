import { createContext, useContext, useState } from 'react';

const OrderContext = createContext(null);

const EMPTY_SHIPPING = {
  firstName: '', lastName: '', email: '', phone: '',
  street: '', city: '', state: '', zip: '', country: 'India',
  paymentOption: 'card', promo: '',
};

export function OrderProvider({ children }) {
  const [shipping, setShipping] = useState(EMPTY_SHIPPING);
  const [order, setOrder] = useState(null);

  const placeOrder = (payload) => setOrder(payload);
  const resetOrder = () => {
    setOrder(null);
    setShipping(EMPTY_SHIPPING);
  };

  return (
    <OrderContext.Provider
      value={{ shipping, setShipping, order, placeOrder, resetOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export const useOrder = () => useContext(OrderContext);
