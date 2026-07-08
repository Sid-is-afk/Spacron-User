import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const handleAddItem = (item) => {
    setCartItems([...cartItems, { ...item, id: Date.now().toString() }]);
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const updateItemQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const totalItemCost = cartItems.reduce(
    (sum, item) => sum + item.cost * (item.quantity || 1),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        handleAddItem,
        handleRemoveItem,
        updateItemQuantity,
        totalItemCost,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
