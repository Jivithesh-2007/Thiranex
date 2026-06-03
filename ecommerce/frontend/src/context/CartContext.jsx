import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { cartService } from '../services/cartService';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

const getStoredCart = () => {
  const cart = localStorage.getItem('shophub-cart');
  return cart ? JSON.parse(cart) : { items: [] };
};

export function CartProvider({ children }) {
  const { token } = useContext(AuthContext);
  const [cart, setCart] = useState(getStoredCart);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('shophub-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (!token) return;
    cartService.get(token).then((data) => setCart(data.cart)).catch(() => undefined);
  }, [token]);

  const sync = async (nextCart) => {
    setCart(nextCart);
    return nextCart;
  };

  const addItem = async (product, quantity = 1) => {
    setLoading(true);
    try {
      if (token) {
        const data = await cartService.add({ productId: product._id, quantity }, token);
        return sync(data.cart);
      }
      const existing = cart.items.find((item) => item.product._id === product._id);
      const items = existing
        ? cart.items.map((item) => (item.product._id === product._id ? { ...item, quantity: item.quantity + quantity } : item))
        : [...cart.items, { _id: product._id, product, quantity, price: product.price }];
      return sync({ ...cart, items });
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (itemId, quantity) => {
    if (token) {
      const data = await cartService.update(itemId, { quantity }, token);
      return sync(data.cart);
    }
    const items = cart.items
      .map((item) => (item._id === itemId ? { ...item, quantity } : item))
      .filter((item) => item.quantity > 0);
    return sync({ ...cart, items });
  };

  const removeItem = async (itemId) => {
    if (token) {
      const data = await cartService.remove(itemId, token);
      return sync(data.cart);
    }
    return sync({ ...cart, items: cart.items.filter((item) => item._id !== itemId) });
  };

  const clearCart = async () => {
    if (token) {
      await cartService.clear(token);
    }
    return sync({ items: [] });
  };

  const subtotal = cart.items.reduce((sum, item) => sum + item.quantity * (item.price || item.product?.price || 0), 0);
  const shipping = subtotal > 50 ? 0 : 5;
  const tax = Number((subtotal * 0.1).toFixed(2));
  const total = Number((subtotal + shipping + tax).toFixed(2));

  const value = useMemo(
    () => ({ cart, setCart, loading, addItem, updateItem, removeItem, clearCart, subtotal, shipping, tax, total, itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0) }),
    [cart, loading, subtotal, shipping, tax, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
