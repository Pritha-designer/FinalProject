// src/context/CartContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load from localStorage on initial render
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (newItems) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      newItems.forEach((item) => {
        const existingIndex = updatedCart.findIndex(i => i.crackerId === item.crackerId);
        if (existingIndex !== -1) {
          updatedCart[existingIndex].quantity += item.quantity;
        } else {
          updatedCart.push(item);
        }
      });
      return updatedCart;
    });
  };

  const clearCart = () => setCart([]);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart, subtotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
