import React, { createContext, useState, useEffect } from "react";

// Create the Cart Context
export const CartContext = createContext();

// Create the Cart Provider component
export const CartProvider = ({ children }) => {
  // State to hold cart items
  const [cartItems, setCartItems] = useState([]);

  // Load cart items from local storage when the component mounts
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cartItems'));
    if (savedCart) setCartItems(savedCart);
  }, []);

  // Save cart items to local storage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Function to update the quantity of an item
  const updateQuantity = (name, newQuantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.name === name ? { ...item, quantity: Math.max(newQuantity, 0) } : item
      )
    );
  };

  // Function to remove an item from the cart
  const removeItem = (name) => {
    setCartItems((prev) => prev.filter((item) => item.name !== name));
  };

  // Function to add a product to the cart
  const addToCart = (product) => {
    setCartItems((prev) => {
      // Check if the product already exists in the cart
      const itemExists = prev.find((item) => item.name === product.name);

      if (itemExists) {
        // If it exists, increment the quantity
        return prev.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If it doesn't exist, add it to the cart with quantity 1
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  // Function to clear the cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Provide state and functions to the context
  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateQuantity, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
