'use client';

import { Cart } from '@prisma/client';
import { PropsWithChildren, createContext, useContext, useState } from 'react';

type CartContext = {
  carts: Cart[];
};

const CartContext = createContext<CartContext | null>(null);

type CartProviderProps = {
  carts: Cart[];
} & PropsWithChildren;

export function CartProvider({ children, carts }: CartProviderProps) {
  const [_carts, setCarts] = useState(carts);
  return (
    <CartContext.Provider value={{ carts }}>{children}</CartContext.Provider>
  );
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context)
    throw new Error('useCartContext should be used inside CartProvider');
  return context;
}
