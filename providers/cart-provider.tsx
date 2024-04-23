'use client';
import { PropsWithChildren, createContext, useContext, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

type CartItem = {
  productId: string;
  amount: number;
};
type CartContext = {
  items: CartItem[];
  addItem: (productId: string) => void;
};
const CartContext = createContext<CartContext | null>(null);

export function CartProvider({ children }: PropsWithChildren) {
  const [items, setItems] = useLocalStorage<CartItem[]>('cart-items', [], {
    initializeWithValue: false
  });
  const addItem = (productId: string) => {
    const exists = items.find((item) => item.productId == productId);
    if (!exists) {
      items.push({
        productId,
        amount: 1
      });
    } else {
      exists.amount += 1;
    }
    setItems([...items]);
  };
  return (
    <CartContext.Provider value={{ items, addItem }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error(
      'useCartContext should be used inside cart context provider'
    );
  }
  return context;
}
