'use client';

import { useState } from 'react';
import Nav from './Nav';
import CartDrawer from './CartDrawer';

export default function PageLayout({ children }: { children: React.ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <>
      <Nav onCartOpen={() => setCartOpen(true)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      {children}
    </>
  );
}
