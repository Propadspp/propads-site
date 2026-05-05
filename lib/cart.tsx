'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  category: string;
  size: string;
  qty: number;
};

type CartCtx = {
  cart: CartItem[];
  addItem: (item: Omit<CartItem, 'qty'>) => void;
  removeItem: (id: string, size: string) => void;
  updateQty: (id: string, size: string, qty: number) => void;
  totalQty: number;
  subtotal: number;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('propads_cart');
      if (saved) setCart(JSON.parse(saved));
    } catch {}
  }, []);

  const save = (next: CartItem[]) => {
    setCart(next);
    localStorage.setItem('propads_cart', JSON.stringify(next));
  };

  const addItem = useCallback((item: Omit<CartItem, 'qty'>) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id && i.size === item.size);
      const next = existing
        ? prev.map(i => i.id === item.id && i.size === item.size ? { ...i, qty: i.qty + 1 } : i)
        : [...prev, { ...item, qty: 1 }];
      localStorage.setItem('propads_cart', JSON.stringify(next));
      return next;
    });
  }, []);

  const removeItem = useCallback((id: string, size: string) => {
    setCart(prev => {
      const next = prev.filter(i => !(i.id === id && i.size === size));
      localStorage.setItem('propads_cart', JSON.stringify(next));
      return next;
    });
  }, []);

  const updateQty = useCallback((id: string, size: string, qty: number) => {
    setCart(prev => {
      const next = qty <= 0
        ? prev.filter(i => !(i.id === id && i.size === size))
        : prev.map(i => i.id === id && i.size === size ? { ...i, qty } : i);
      localStorage.setItem('propads_cart', JSON.stringify(next));
      return next;
    });
  }, []);

  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <Ctx.Provider value={{ cart, addItem, removeItem, updateQty, totalQty, subtotal }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
